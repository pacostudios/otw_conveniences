import Link from "next/link";
import { DealPanel } from "@/components/deal-panel";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, getCategory, getProducts } from "@/data/catalog";

const FILTERS = [
  { href: "/", slug: undefined, name: "All Products" },
  ...CATEGORIES.map(({ slug, name }) => ({ href: `/${slug}`, slug, name })),
];

export function AllProducts({ categorySlug }: { categorySlug?: string }) {
  const heading = categorySlug ? getCategory(categorySlug)?.name : "All Products";
  const products = getProducts(categorySlug);

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="scroll-mt-20 border-t border-stone-200"
    >
      <div className="mx-auto max-w-[1344px] px-6 py-16 2xl:px-0">
        <div className="grid gap-6 border-b border-stone-200 pb-6 lg:grid-cols-[480px_1fr]">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-stone-500 uppercase">
              Original Inventory
            </p>
            <h2
              id="products-heading"
              className="font-display mt-2 text-3xl leading-[1.1] font-black uppercase [font-stretch:125%] sm:text-[40px]"
            >
              {heading}
            </h2>
          </div>

          <nav aria-label="Filter products by category" className="flex flex-wrap content-start gap-2">
            {FILTERS.map(({ href, slug, name }) => {
              const isActive = slug === categorySlug;
              return (
                <Link
                  key={href}
                  href={href}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-display rounded-sm px-3.5 py-3 text-xs font-bold tracking-wide text-white uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 ${
                    isActive ? "bg-brand" : "bg-stone-950 hover:bg-stone-700"
                  }`}
                >
                  {name}{" "}
                  <span className="ml-1 font-mono text-[10px] font-normal text-white/70">
                    ({getProducts(slug).length})
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-8">
          <DealPanel />
        </div>

        {products.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-stone-500">No products in this category yet.</p>
        )}
      </div>
    </section>
  );
}
