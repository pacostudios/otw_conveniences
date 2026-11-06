"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BAG_ICON, CLOSE_ICON, Icon, MENU_ICON } from "@/components/icons";
import { CATEGORIES } from "@/data/catalog";
import { STORE } from "@/data/store";
import { openCart, useCart } from "@/lib/cart";

const NAV_LINKS = [
  { path: "/", label: "All Products" },
  ...CATEGORIES.map(({ slug, name }) => ({ path: `/${slug}`, label: name })),
];

function isNavActive(path: string, pathname: string) {
  // Product pages keep "All Products" highlighted.
  return path === pathname || (path === "/" && pathname.startsWith("/products/"));
}

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setMenuOpen(false);
  // Only pages with the red hero get the red bar; the rest are light from the start.
  const hasHero = NAV_LINKS.some(({ path }) => path === pathname);
  const light = scrolled || !hasHero;

  // The sentinel sits where the bar starts, so it leaves the viewport at the
  // moment the bar becomes stuck, however tall the promo strip has wrapped.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    observer.observe(sentinelRef.current!);
    return () => observer.disconnect();
  }, []);

  const focusRing = `focus-visible:outline-2 focus-visible:outline-offset-2 ${
    light ? "focus-visible:outline-stone-950" : "focus-visible:outline-white"
  }`;
  const secondaryButton = light
    ? "border-stone-200 bg-white text-stone-800 hover:bg-stone-100"
    : "border-white/30 bg-white/15 text-white hover:bg-white/25";
  const linkTone = (isActive: boolean) => {
    if (light) {
      return isActive
        ? "border-stone-950 text-stone-950"
        : "border-transparent text-stone-600 hover:text-stone-950";
    }
    return isActive
      ? "border-white text-white"
      : "border-transparent text-white/75 hover:text-white";
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      {/* Fixed height, so swapping styles never shifts the page content. */}
      <div className="pointer-events-none sticky top-0 z-50 h-20 shrink-0">
        <header
          className={`pointer-events-auto transition-all duration-300 motion-reduce:transition-none ${
            scrolled
              ? "mx-auto mt-1 w-[calc(100%-8px)] max-w-[1280px] rounded-[30px] bg-[#f6f1ed]/95 text-stone-950 shadow-lg backdrop-blur"
              : `w-full max-w-full ${
                  hasHero ? "bg-brand text-white" : "border-b border-stone-200 bg-[#faf8f5] text-stone-950"
                }`
          }`}
        >
          <div
            className={`flex items-center justify-between gap-4 px-4 transition-all duration-300 motion-reduce:transition-none sm:px-6 ${
              scrolled ? "min-h-[60px] py-1.5" : "min-h-20 py-3 2xl:px-12"
            }`}
          >
            <Link
              href="/"
              onClick={closeMenu}
              className={`flex min-w-0 items-center gap-3 rounded-sm ${focusRing}`}
            >
              <span
                aria-hidden="true"
                className={`size-3 shrink-0 rounded-[2px] ${light ? "bg-stone-950" : "bg-white"}`}
              />
              <span className="min-w-0">
                <span
                  className={`font-display block text-sm leading-tight font-black tracking-tight uppercase [font-stretch:125%] sm:text-lg xl:whitespace-nowrap ${
                    scrolled ? "" : "2xl:text-2xl 2xl:tracking-[0.02em]"
                  }`}
                >
                  {STORE.name}
                </span>
                <span
                  className={`font-display mt-1 block truncate text-[8px] font-semibold tracking-[0.18em] uppercase sm:text-[9px] ${
                    light ? "text-stone-500" : "text-white/80"
                  }`}
                >
                  Convenience • Cigarettes • Vapes
                </span>
              </span>
            </Link>

            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-5 2xl:gap-6">
                {NAV_LINKS.map(({ path, label }) => {
                  const isActive = isNavActive(path, pathname);
                  return (
                    <li key={path}>
                      <Link
                        href={`${path}#products`}
                        aria-current={isActive ? "page" : undefined}
                        className={`font-display block border-b-2 py-2 text-[11px] font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors ${focusRing} ${linkTone(isActive)}`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
                onClick={() => {
                  closeMenu();
                  openCart();
                }}
                className={`font-display flex h-[42px] items-center gap-2 rounded-full px-3.5 text-[10px] font-bold tracking-[0.08em] uppercase transition-colors sm:px-5 ${focusRing} ${
                  light
                    ? "bg-stone-950 text-white hover:bg-stone-800"
                    : "text-brand bg-white hover:bg-white/90"
                }`}
              >
                <Icon path={BAG_ICON} />
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && <span className="font-mono">({itemCount})</span>}
              </button>
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
                className={`flex size-[42px] items-center justify-center rounded-md border transition-colors xl:hidden [&_svg]:size-5 ${focusRing} ${secondaryButton}`}
              >
                <Icon path={menuOpen ? CLOSE_ICON : MENU_ICON} />
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav
              id="mobile-menu"
              aria-label="Mobile"
              className={`max-h-[calc(100dvh-6rem)] overflow-y-auto border-t px-4 py-2 sm:px-6 xl:hidden ${
                light ? "border-stone-200" : "border-white/20"
              }`}
            >
              <ul>
                {NAV_LINKS.map(({ path, label }) => {
                  const isActive = isNavActive(path, pathname);
                  return (
                    <li key={path}>
                      <Link
                        href={`${path}#products`}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        className={`font-display my-0.5 block w-fit border-b-2 py-2.5 text-xs font-bold tracking-[0.06em] uppercase ${focusRing} ${linkTone(isActive)}`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </header>
      </div>
    </>
  );
}
