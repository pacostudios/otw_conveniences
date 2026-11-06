const INTRO = "We bring you authentic imported cigarettes, disposable vapes, pod systems, and accessories sourced directly from trusted international distributors.";
const PROMISE = "100% genuine products, tamper-evident seals, discreet unbranded packaging, and convenient cash on delivery.";

const FEATURES = [
  {
    title: "Original Imports",
    description: "Direct imported stock verified for authenticity and freshness.",
    tag: "100% Genuine",
    tagColor: "text-emerald-800",
  },
  {
    title: "Discreet Packaging",
    description: "Plain, secure unbranded packaging delivered safely to your door.",
    tag: "Private",
    tagColor: "text-amber-700",
  },
  {
    title: "Cash on Delivery",
    description: "Pay comfortably with cash when you receive your package.",
    tag: "COD Available",
    tagColor: "text-stone-950",
  },
];

const BOX = "rounded-sm border border-stone-200 bg-white";
const BOX_TITLE = "font-display text-[13px] font-bold tracking-wide uppercase [font-stretch:112%]";

export function WhyUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="mx-auto grid max-w-[1344px] scroll-mt-20 gap-12 px-6 py-24 lg:grid-cols-2 2xl:px-0"
    >
      <div>
        <p className="flex items-center gap-2 font-mono text-[9px] tracking-[0.15em] text-stone-500 uppercase">
          <span aria-hidden="true" className="size-2 rounded-[2px] bg-stone-950" />
          Why shop with us // Quality &amp; trust
        </p>
        <h2
          id="why-us-heading"
          className="font-display mt-7 text-3xl leading-[1.15] font-black uppercase [font-stretch:125%] xl:text-[38px]"
        >
          Original Imports &amp; Discreet Delivery.
        </h2>
        <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-stone-600">{INTRO}</p>
        <div className={`mt-6 p-4 ${BOX}`}>
          <h3 className={BOX_TITLE}>Our Promise</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600">{PROMISE}</p>
        </div>
      </div>

      <ol className="grid gap-3">
        {FEATURES.map(({ title, description, tag, tagColor }, index) => (
          <li key={title} className={`flex flex-col justify-center p-5 ${BOX}`}>
            <p className="flex items-center justify-between gap-4 font-mono text-[9px] tracking-wider uppercase">
              <span className="text-stone-500">{String(index + 1).padStart(2, "0")}</span>
              <span className={`font-bold ${tagColor}`}>{tag}</span>
            </p>
            <h3 className={`mt-2.5 ${BOX_TITLE}`}>{title}</h3>
            <p className="mt-1 text-[13px] text-stone-600">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
