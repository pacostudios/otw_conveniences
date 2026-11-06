import { useSyncExternalStore } from "react";
import {
  CARTON_DEAL,
  PRODUCTS,
  cartonCount,
  dealDiscount,
  formatPrice,
  getMinQuantity,
  getProduct,
} from "@/data/catalog";

type CartItems = Record<string, number>;
type CartState = { items: CartItems; isOpen: boolean };

const STORAGE_KEY = "store-cart";
const SERVER_STATE: CartState = { items: {}, isOpen: false };

let state: CartState | undefined;
const listeners = new Set<() => void>();

function readSavedItems(): CartItems {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (typeof saved !== "object" || saved === null) return {};
    return Object.fromEntries(
      Object.entries(saved).filter(
        (entry): entry is [string, number] => Number.isInteger(entry[1]) && entry[1] > 0,
      ),
    );
  } catch {
    return {};
  }
}

function getState() {
  state ??= { items: readSavedItems(), isOpen: false };
  return state;
}

function update(next: Partial<CartState>) {
  state = { ...getState(), ...next };
  if (next.items) localStorage.setItem(STORAGE_KEY, JSON.stringify(next.items));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  // Keeps other open tabs in step with this one.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    state = { ...getState(), items: readSavedItems() };
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function openCart() {
  update({ isOpen: true });
}

export function closeCart() {
  update({ isOpen: false });
}

/** Going below the product's minimum removes it from the cart. */
export function setQuantity(productId: string, quantity: number) {
  const items = { ...getState().items };
  const product = getProduct(productId);
  if (product && quantity >= getMinQuantity(product)) items[productId] = quantity;
  else delete items[productId];
  update({ items });
}

/** Adds the product's minimum quantity unless a quantity is given. */
export function addToCart(productId: string, quantity?: number) {
  const { items } = getState();
  const product = getProduct(productId);
  if (!product) return;
  const added = quantity ?? getMinQuantity(product);
  update({ items: { ...items, [productId]: (items[productId] ?? 0) + added }, isOpen: true });
}

function summarize(items: CartItems) {
  // Going through PRODUCTS drops saved items that are no longer in the catalogue.
  const lines = PRODUCTS.filter((product) => items[product.id]).map((product) => ({
    product,
    quantity: items[product.id],
    lineTotal: product.price * items[product.id],
  }));
  const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

  const subtotal = sum(lines.map((line) => line.lineTotal));
  const cartons = sum(lines.map((line) => cartonCount(line.product, line.quantity)));
  const dealsEarned = Math.floor(cartons / CARTON_DEAL.cartons);
  const discount = dealDiscount(cartons);

  const orderMessage = [
    "New order:",
    ...lines.map((line) => `${line.quantity} x ${line.product.name}: ${formatPrice(line.lineTotal)}`),
    ...(discount > 0 ? [`Carton deal: -${formatPrice(discount)}`] : []),
    ...(dealsEarned > 0 ? [`Free lighters: ${dealsEarned}`] : []),
    `Total: ${formatPrice(subtotal - discount)}`,
  ].join("\n");

  return {
    lines,
    orderMessage,
    itemCount: sum(lines.map((line) => line.quantity)),
    cartons,
    dealsEarned,
    subtotal,
    discount,
    total: subtotal - discount,
  };
}

export function useCart() {
  const { items, isOpen } = useSyncExternalStore(subscribe, getState, () => SERVER_STATE);
  return { ...summarize(items), isOpen };
}
