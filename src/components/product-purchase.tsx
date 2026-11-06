"use client";

import { useState } from "react";
import { BAG_ICON, Icon } from "@/components/icons";
import {
  CARTON_DEAL,
  cartonCount,
  dealDiscount,
  formatPrice,
  getMinQuantity,
  unitLabel,
  type Product,
} from "@/data/catalog";
import { addToCart } from "@/lib/cart";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950";
const EYEBROW = "font-mono text-[10px] tracking-wider uppercase";
const OPTION_TITLE = "font-display text-xs font-bold uppercase [font-stretch:112%]";

function BundleOptions({
  product,
  cartonSize,
  quantity,
  onSelect,
}: {
  product: Product;
  cartonSize: number;
  quantity: number;
  onSelect: (quantity: number) => void;
}) {
  const single = cartonSize * product.price;
  const dealQuantity = cartonSize * CARTON_DEAL.cartons;
  const dealFullPrice = dealQuantity * product.price;
  const option = (isSelected: boolean) =>
    `flex items-center justify-between gap-3 rounded-sm bg-white p-3.5 text-left transition-colors ${FOCUS} ${
      isSelected ? "border-2 border-stone-950" : "border border-stone-200 hover:border-stone-400"
    }`;

  return (
    <div className="mt-6">
      <p className={`flex flex-wrap justify-between gap-2 ${EYEBROW}`}>
        <span className="text-stone-500">Select carton bundle</span>
        <span className="text-brand font-bold">
          {CARTON_DEAL.cartons} cartons = ${CARTON_DEAL.discount} off
        </span>
      </p>
      <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
        <button
          type="button"
          aria-pressed={quantity === cartonSize}
          onClick={() => onSelect(cartonSize)}
          className={option(quantity === cartonSize)}
        >
          <span>
            <span className={`block ${OPTION_TITLE}`}>
              1 carton ({cartonSize} {unitLabel(product, cartonSize)})
            </span>
            <span className="mt-2 block font-mono text-[10px] text-stone-500">
              Standard {formatPrice(product.price)}/{product.unit}
            </span>
          </span>
          <span className="font-mono text-sm font-bold">{formatPrice(single)}</span>
        </button>
        <button
          type="button"
          aria-pressed={quantity === dealQuantity}
          onClick={() => onSelect(dealQuantity)}
          className={option(quantity === dealQuantity)}
        >
          <span>
            <span className={`block ${OPTION_TITLE}`}>
              {CARTON_DEAL.cartons} cartons ({dealQuantity} {unitLabel(product, dealQuantity)})
            </span>
            <span className="mt-1.5 block font-mono text-[10px] text-stone-600">
              Save ${CARTON_DEAL.discount} + Free Lighter
            </span>
          </span>
          <span className="shrink-0 text-right font-mono">
            <span className="block text-sm font-bold">
              {formatPrice(dealFullPrice - CARTON_DEAL.discount)}
            </span>
            <s className="block text-[10px] text-stone-400">{formatPrice(dealFullPrice)}</s>
          </span>
        </button>
      </div>
    </div>
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  const minQuantity = getMinQuantity(product);
  const [quantity, setQuantity] = useState(minQuantity);
  const total = quantity * product.price - dealDiscount(cartonCount(product, quantity));
  const unit = unitLabel(product, quantity);

  return (
    <>
      {product.cartonSize && (
        <BundleOptions
          product={product}
          cartonSize={product.cartonSize}
          quantity={quantity}
          onSelect={setQuantity}
        />
      )}

      <p className={`mt-6 flex justify-between gap-2 ${EYEBROW}`}>
        <span className="text-stone-500">
          Custom quantity{minQuantity > 1 && ` (minimum ${minQuantity} to buy)`}:
        </span>
        <span aria-live="polite" className="font-bold normal-case">
          {quantity} {unit}
        </span>
      </p>

      <div className="mt-2.5 flex flex-col gap-3 sm:flex-row">
        <div className="flex h-12 items-center justify-between rounded-sm border border-stone-200 bg-white font-mono text-sm sm:w-[108px]">
          <button
            type="button"
            disabled={quantity <= minQuantity}
            onClick={() => setQuantity(quantity - 1)}
            aria-label="Decrease quantity"
            className={`grid h-full w-9 place-items-center disabled:text-stone-300 ${FOCUS}`}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className={`grid h-full w-9 place-items-center ${FOCUS}`}
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product.id, quantity)}
          className={`font-display flex h-12 items-center justify-center gap-2 rounded-sm bg-stone-950 px-4 sm:flex-1 text-[11px] font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-stone-700 ${FOCUS}`}
        >
          <Icon path={BAG_ICON} />
          Add {quantity} {unit} to bag ({formatPrice(total)})
        </button>
      </div>

      {product.cartonSize && (
        <p className="mt-3 flex flex-wrap justify-between gap-2 rounded-sm border border-stone-200 p-3 font-mono text-[10px]">
          <span>
            Order {CARTON_DEAL.cartons}+ cartons for ${CARTON_DEAL.discount} off + Free Lighter
          </span>
          <span className="text-brand font-bold uppercase">
            -${CARTON_DEAL.discount} + Free gift
          </span>
        </p>
      )}
    </>
  );
}
