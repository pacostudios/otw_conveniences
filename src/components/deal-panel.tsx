"use client";

import Link from "next/link";
import { CARTON_DEAL } from "@/data/catalog";
import { useCart } from "@/lib/cart";

const TITLE = "font-display text-lg leading-snug font-black uppercase [font-stretch:125%] xl:text-xl";
const EYEBROW = "font-mono text-[9px] tracking-widest text-stone-500 uppercase";

export function DealPanel() {
  const { cartons } = useCart();
  const progress = Math.min(cartons / CARTON_DEAL.cartons, 1) * 100;

  return (
    <div className="grid divide-y divide-stone-200 rounded-sm border border-stone-200 bg-white lg:grid-cols-[5fr_4fr_3fr] lg:divide-x lg:divide-y-0">
      <div className="flex flex-col justify-between gap-8 p-6">
        <p className={`flex flex-wrap items-center gap-2 ${EYEBROW}`}>
          <span className="border border-stone-300 bg-promo px-2 py-1 font-bold text-stone-900">
            Halloween Week Offer
          </span>
          All imported cigarettes
        </p>
        <div>
          <h3 className={TITLE}>All Cigarettes $12 / Pack</h3>
          <p className="mt-2 text-sm text-stone-600">$120 per 10-pack carton across all imported brands.</p>
        </div>
      </div>

      <div className="p-6">
        <p className={`flex items-center justify-between gap-2 ${EYEBROW}`}>
          Two-Carton Savings
          <span className="bg-emerald-100 px-2 py-1 font-bold text-emerald-800">Save $20</span>
        </p>
        <h3 className={`mt-4 ${TITLE}`}>Order 2 Cartons, Get $20 Off</h3>
        <p className="mt-2 text-sm text-stone-600">
          2 cartons (20 packs) for <strong className="text-stone-950">$220</strong>{" "}
          <s>$240</s> ($110/carton) + complimentary lighter.
        </p>
      </div>

      <div className="flex flex-col justify-between gap-6 p-6">
        <p className={`flex items-center justify-between gap-2 ${EYEBROW}`}>
          2-Carton Deal
          <span className="font-bold text-stone-900">
            {cartons} / {CARTON_DEAL.cartons} Cartons
          </span>
        </p>
        <div
          role="progressbar"
          aria-label="Cartons towards the deal"
          aria-valuemin={0}
          aria-valuemax={CARTON_DEAL.cartons}
          aria-valuenow={Math.min(cartons, CARTON_DEAL.cartons)}
          className="h-1.5 rounded-full bg-stone-200"
        >
          <div className="bg-brand h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <Link
          href="/imported-cigarettes#products"
          className="rounded-sm border border-stone-200 px-3 py-2.5 text-center font-mono text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
        >
          Browse $12 Cigarettes
        </Link>
      </div>
    </div>
  );
}
