"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { CLOSE_ICON, Icon, LOCK_ICON, TRUCK_ICON } from "@/components/icons";
import { CARTON_DEAL, formatPrice } from "@/data/catalog";
import { STORE, WHATSAPP_URL } from "@/data/store";
import { closeCart, setQuantity, useCart } from "@/lib/cart";

const CHIP = "shrink-0 border border-stone-200 px-1.5 py-1 font-mono text-[9px] font-bold";
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950";
const CHECKOUT = `mt-4 w-full rounded-sm bg-[#25d366] px-4 py-3 font-mono text-[11px] font-bold tracking-wide text-stone-950 uppercase transition-colors hover:bg-[#1fbd5a] ${FOCUS}`;
const STEPPER = `grid size-7 place-items-center text-sm transition-colors hover:bg-stone-100 ${FOCUS}`;

type CartLine = ReturnType<typeof useCart>["lines"][number];

function LineItem({ line: { product, quantity, lineTotal } }: { line: CartLine }) {
  return (
    <li className="flex gap-3 rounded-sm border border-stone-200 bg-white p-3">
      <div className="relative size-16 shrink-0 bg-stone-100">
        {product.image && (
          <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xs font-bold tracking-tight uppercase">{product.name}</h3>
          <button
            type="button"
            onClick={() => setQuantity(product.id, 0)}
            aria-label={`Remove ${product.name} from cart`}
            className={`text-stone-400 transition-colors hover:text-stone-950 ${FOCUS}`}
          >
            <Icon path={CLOSE_ICON} />
          </button>
        </div>
        <p className="mt-0.5 font-mono text-[10px] text-stone-500">
          {formatPrice(product.price)}
          {product.unit && ` / ${product.unit}`}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border border-stone-200 font-mono text-xs">
            <button
              type="button"
              onClick={() => setQuantity(product.id, quantity - 1)}
              aria-label={`Remove one ${product.name}`}
              className={STEPPER}
            >
              −
            </button>
            <span aria-live="polite" className="w-7 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(product.id, quantity + 1)}
              aria-label={`Add one ${product.name}`}
              className={STEPPER}
            >
              +
            </button>
          </div>
          <p className="font-mono text-xs font-bold">{formatPrice(lineTotal)}</p>
        </div>
      </div>
    </li>
  );
}

function SummaryRow({ label, value, tone = "" }: { label: string; value: string; tone?: string }) {
  return (
    <div className={`flex justify-between gap-4 ${tone}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function CartDrawer() {
  const { lines, orderMessage, itemCount, cartons, dealsEarned, subtotal, discount, total, isOpen } =
    useCart();
  const [showPreview, setShowPreview] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const progress = Math.min(cartons / CARTON_DEAL.cartons, 1) * 100;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleClose = () => {
    setShowPreview(false);
    closeCart();
  };

  // A click on the dialog element itself can only be on the backdrop around the panel.
  const closeOnBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cart-heading"
      onClose={handleClose}
      onClick={closeOnBackdropClick}
      className="motion-safe:open:animate-slide-in m-0 ml-auto h-dvh max-h-none w-full max-w-[452px] flex-col bg-[#faf8f5] font-sans text-stone-950 backdrop:bg-stone-950/50 backdrop:backdrop-blur-sm open:flex"
    >
      <header className="flex items-start justify-between gap-4 border-b border-stone-200 bg-white px-6 py-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2
              id="cart-heading"
              className="font-display text-[15px] leading-none font-black uppercase [font-stretch:125%]"
            >
              Your Cart
            </h2>
            <span className={`${CHIP} bg-stone-50 font-normal`}>{itemCount}</span>
          </div>
          <p className="mt-2 font-mono text-[9px] tracking-widest text-emerald-800 uppercase">
            Items in cart
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close cart"
          className={`mt-1.5 [&_svg]:size-5 ${FOCUS}`}
        >
          <Icon path={CLOSE_ICON} />
        </button>
      </header>

      <p className="flex items-center justify-between gap-3 border-b border-stone-200 bg-stone-100 px-6 py-2.5 font-mono text-[10px] font-bold tracking-wide text-emerald-800 uppercase">
        <span className="flex items-center gap-1.5">
          <Icon path={TRUCK_ICON} />
          {STORE.deliveryNote}
        </span>
        <span className={`${CHIP} border-transparent bg-emerald-100`}>Free ($0)</span>
      </p>

      <div className="border-b border-stone-200 bg-white px-6 py-3">
        <p className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold tracking-wide uppercase">
          Buy {CARTON_DEAL.cartons} cartons: ${CARTON_DEAL.discount} off + free lighter
          <span className={`${CHIP} font-normal`}>
            {cartons}/{CARTON_DEAL.cartons}
          </span>
        </p>
        <div
          role="progressbar"
          aria-label="Cartons towards the deal"
          aria-valuemin={0}
          aria-valuemax={CARTON_DEAL.cartons}
          aria-valuenow={Math.min(cartons, CARTON_DEAL.cartons)}
          className="mt-2 h-1 rounded-full bg-stone-200"
        >
          <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="grid size-14 place-items-center rounded-sm border border-stone-200 bg-stone-100 text-stone-600 [&_svg]:size-6">
            <Icon path={LOCK_ICON} />
          </span>
          <h3 className="font-display mt-5 text-[13px] font-bold tracking-wide uppercase [font-stretch:112%]">
            Your Cart Is Empty
          </h3>
          <p className="mt-1.5 text-xs text-stone-500">
            You haven&apos;t added any products to your cart yet.
          </p>
          <Link
            href="/#products"
            onClick={handleClose}
            className={`mt-5 rounded-sm bg-stone-950 px-4 py-2.5 font-mono text-[11px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-stone-700 ${FOCUS}`}
          >
            Shop All Products
          </Link>
        </div>
      ) : showPreview ? (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[13px] font-bold tracking-wide uppercase [font-stretch:112%]">
              WhatsApp Message
            </h3>
            <span className={`${CHIP} border-transparent bg-amber-100 text-amber-900 uppercase`}>
              Demo
            </span>
          </div>
          <p className="mt-4 rounded-sm border border-stone-200 bg-[#dcf8c6] p-4 font-mono text-xs leading-relaxed whitespace-pre-line">
            {orderMessage}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            Preview only. Add the WhatsApp number in store.ts to send orders.
          </p>
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={`mt-5 w-full rounded-sm border border-stone-300 bg-white px-4 py-3 font-mono text-[11px] font-bold tracking-wide uppercase transition-colors hover:bg-stone-100 ${FOCUS}`}
          >
            Back to Cart
          </button>
        </div>
      ) : (
        <>
          <ul className="flex-1 space-y-3 overflow-y-auto p-6">
            {lines.map((line) => (
              <LineItem key={line.product.id} line={line} />
            ))}
          </ul>
          <div className="border-t border-stone-200 bg-white px-6 py-5">
          <dl className="space-y-1.5 font-mono text-xs">
            <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
            {discount > 0 && (
              <SummaryRow label="Carton deal" value={`-${formatPrice(discount)}`} tone="text-emerald-800" />
            )}
            {dealsEarned > 0 && (
              <SummaryRow
                label={dealsEarned > 1 ? `Free lighters × ${dealsEarned}` : "Free lighter"}
                value="$0"
                tone="text-emerald-800"
              />
            )}
            <SummaryRow label="Delivery" value="$0" />
            <SummaryRow
              label="Total"
              value={formatPrice(total)}
              tone="border-t border-stone-200 pt-2 text-sm font-bold"
            />
          </dl>
          {WHATSAPP_URL ? (
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(orderMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center ${CHECKOUT}`}
            >
              Checkout on WhatsApp
            </a>
          ) : (
            <button type="button" onClick={() => setShowPreview(true)} className={CHECKOUT}>
              Checkout on WhatsApp
            </button>
          )}
          </div>
        </>
      )}
    </dialog>
  );
}
