import Link from "next/link";
import { CigarettePack } from "@/components/cigarette-pack";
import { STORE } from "@/data/store";

const SHOP_LINKS = [
  { href: "/imported-cigarettes#products", label: "Shop Cigarettes" },
  { href: "/disposable-vapes#products", label: "Shop Vapes" },
  { href: "/pouches#products", label: "Shop Pouches" },
];

const DEALS = ["All Cigarettes Flat $12 ($120 Carton)", "2 Cartons: $220 ($20 OFF + Free Lighter)"];

const HEADLINE = "font-display text-7xl leading-none font-bold tracking-tight uppercase xl:text-8xl 2xl:text-[104px]";
const SUBHEAD = "font-serif mt-2 text-5xl leading-[1.15] text-[#fbd9c4] italic xl:text-[64px] 2xl:text-[72px]";
const BODY = "mt-5 max-w-md font-mono text-[13px] leading-[1.75]";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3 shrink-0 text-amber-300"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

function ExploreBadge() {
  return (
    <Link
      href="#products"
      aria-label="Explore the vault"
      className="relative grid size-24 shrink-0 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="motion-safe:animate-spin-slow absolute inset-0"
      >
        <defs>
          <path id="explore-ring" d="M50 50 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0" />
        </defs>
        <text fill="currentColor" fontFamily="monospace" fontSize="7" fontWeight="700" letterSpacing="1.45">
          <textPath href="#explore-ring">EXPLORE VAULT • ORIGINAL IMPORTS • DISCOVER ALL •</textPath>
        </text>
      </svg>
      <span className="font-display flex size-[60px] flex-col items-center justify-center rounded-full bg-[#10382d] text-[8px] font-bold tracking-wider">
        <span aria-hidden="true" className="text-base leading-none text-amber-300">
          ↓
        </span>
        VAULT
      </span>
    </Link>
  );
}

export function Hero() {
  return (
    <section
      aria-label="Featured"
      // Pulled up by the navbar's height so the hero sits behind the floating pill.
      className="bg-brand relative -mt-20 overflow-hidden pt-20 text-white [background-image:linear-gradient(to_right,rgb(255_255_255/0.09)_1px,transparent_1px)] [background-position:top_center] [background-size:133px_100%]"
    >
      <div className="relative h-16 lg:h-[197px]">
        <div
          aria-hidden="true"
          className="mx-auto hidden max-w-[1600px] justify-between pt-4 font-mono text-[8px] tracking-widest text-white/40 lg:flex"
        >
          <span>+ 01.A</span>
          <span>+ 12.Z</span>
        </div>
      </div>

      <div className="relative border-y border-white/10">
        <p
          aria-hidden="true"
          className="font-display pointer-events-none absolute -top-2 left-2 text-[13.5vw] leading-none font-bold whitespace-nowrap text-white/15 uppercase select-none"
        >
          {STORE.name}
        </p>

        <div className="relative mx-auto grid max-w-[1504px] gap-10 px-6 py-12 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-6 lg:py-12 2xl:px-0">
          <div className="motion-safe:animate-fade-in">
            <h1>
              <span className={`block ${HEADLINE}`}>Pure</span>
              <span className={`block ${SUBHEAD}`}>Vintage Blend</span>
            </h1>
            <p className={BODY}>
              Preserved high-grade Virginia leaf and handcrafted filter tubes. Uncompromised
              authentic taste.
            </p>
          </div>

          <CigarettePack className="motion-safe:animate-fade-in mx-auto w-52 -rotate-2 [--fade-delay:150ms] drop-shadow-[0_24px_30px_rgb(70_10_0/0.55)] lg:mt-4 xl:w-60" />

          {/* Negative margin lifts the badge so VAULT lines up with PURE. */}
          <div className="motion-safe:animate-fade-in flex flex-col [--fade-delay:300ms] lg:-mt-9 lg:items-end lg:text-right">
            <p className="w-fit rounded-sm border border-white/20 bg-stone-950/70 px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest uppercase">
              All cigs $12/pack
            </p>
            <h2 className="mt-3">
              <span className={`block ${HEADLINE}`}>Vault</span>
              <span className={`block ${SUBHEAD}`}>Imported Grade</span>
            </h2>
            <p className={BODY}>
              All imported cigarettes flat $12/pack ($120 carton). Order 2 cartons and get $20 off
              ($220 total).
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-wider text-amber-300 uppercase">
              1 carton $120 • 2 cartons $220 (-$20 off)
            </p>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-12 border-b border-white/10 lg:h-[110px]" />

      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-8 lg:flex-row lg:items-center lg:justify-between 2xl:px-0">
        <div className="font-mono text-[10px] tracking-wide">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 uppercase">
            All cigs $12/pack • 2 cartons = $20 off
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11px]">
            {DEALS.map((deal) => (
              <li key={deal} className="flex items-center gap-1.5">
                <CheckIcon />
                {deal}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Shop by category" className="flex flex-wrap gap-2">
          {SHOP_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-display rounded-sm border border-white/30 bg-white/15 px-4 py-2.5 text-[11px] font-bold tracking-wide uppercase transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <ExploreBadge />
      </div>
    </section>
  );
}
