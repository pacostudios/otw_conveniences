export function PromoBar() {
  return (
    <aside
      aria-label="Current promotion"
      className="bg-promo font-mono text-[10px] tracking-[0.12em] text-stone-700 uppercase"
    >
      <div className="mx-auto flex min-h-[38px] max-w-[1600px] items-center justify-between gap-6 px-4 py-2 sm:px-6 2xl:px-0">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="border border-stone-300 bg-white px-2 py-0.5 text-[9px] font-bold text-stone-900">
            Halloween Week
          </span>
          <span>
            All cigarettes <strong className="text-stone-950">$12/pack</strong>{" "}
            ($120 carton) — Order 2 cartons &amp; get{" "}
            <strong className="text-stone-950">$20 off</strong> + free lighter
          </span>
        </p>
        <p className="hidden shrink-0 text-stone-500 lg:block">
          2 cartons = <strong className="text-stone-950">$220</strong> ($20 off)
        </p>
      </div>
    </aside>
  );
}
