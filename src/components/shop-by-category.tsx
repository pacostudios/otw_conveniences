import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type Category } from "@/data/catalog";

function CategoryCard({ category, index }: { category: Category; index: number }) {
  return (
    <Link
      href={`/${category.slug}#products`}
      className={`group relative flex h-64 flex-col justify-end overflow-hidden rounded-sm bg-gradient-to-br p-6 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 ${category.placeholder}`}
    >
      {category.image && (
        <Image
          src={category.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-transparent" />

      <div className="absolute inset-x-6 top-6 flex items-start justify-between">
        <p className="flex gap-1 font-mono text-[9px] font-bold tracking-widest uppercase">
          <span className="bg-stone-950/70 px-2 py-1">Div. {String(index + 1).padStart(2, "0")}</span>
          {category.featured && (
            <span className="bg-stone-950/70 px-2 py-1 text-amber-300">Featured</span>
          )}
        </p>
        <span
          aria-hidden="true"
          className="grid size-7 place-items-center rounded-full bg-white/20 text-sm transition-colors group-hover:bg-white/40"
        >
          ↗
        </span>
      </div>

      <div className="relative">
        <p className="font-mono text-[9px] tracking-widest text-amber-300 uppercase">
          {category.tagline}
        </p>
        <h3 className="font-display mt-2 text-xl leading-snug font-bold tracking-tight uppercase [font-stretch:125%]">
          {category.name}
        </h3>
        <p className="mt-1.5 text-xs text-white/75 uppercase">{category.description}</p>
      </div>
    </Link>
  );
}

export function ShopByCategory() {
  return (
    <section aria-labelledby="categories-heading" className="mx-auto max-w-[1344px] px-6 pt-14 pb-12 2xl:px-0">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-stone-200 pb-5">
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-stone-500 uppercase">Our Store</p>
          <h2
            id="categories-heading"
            className="font-display mt-2 text-2xl leading-none font-black uppercase [font-stretch:125%] sm:text-3xl"
          >
            Shop by Category
          </h2>
        </div>
        <p className="text-xs text-stone-500">Click any category to filter products</p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {CATEGORIES.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
