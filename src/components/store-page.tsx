import { AllProducts } from "@/components/all-products";
import { Hero } from "@/components/hero";
import { ShopByCategory } from "@/components/shop-by-category";
import { WhyUs } from "@/components/why-us";

export function StorePage({ categorySlug }: { categorySlug?: string }) {
  return (
    <main className="flex-1 bg-[#faf8f5] font-sans text-stone-950">
      <Hero />
      <ShopByCategory />
      <AllProducts categorySlug={categorySlug} />
      <div className="border-t border-stone-200">
        <WhyUs />
      </div>
    </main>
  );
}
