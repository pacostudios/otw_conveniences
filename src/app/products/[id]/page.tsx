import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import {
  PRODUCTS,
  discountPercent,
  formatPrice,
  getCategory,
  getMinQuantity,
  getProduct,
  unitLabel,
} from "@/data/catalog";

// Unknown URLs stop at notFound() below, which instant validation reports as an
// error because the page never renders. Real products are prerendered anyway.
export const instant = false;

const CHIP = "border px-2 py-1 font-mono text-[9px] font-bold tracking-wider uppercase";

export function generateStaticParams() {
  return PRODUCTS.map(({ id }) => ({ id }));
}

function Section({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-stone-200 py-4">
      <summary className="font-display flex cursor-pointer list-none items-center justify-between text-xs font-bold tracking-wider uppercase [font-stretch:112%] [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4 text-stone-500 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="mt-4 text-[13px] leading-relaxed text-stone-600">{children}</div>
    </details>
  );
}

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const category = getCategory(product.category);
  const minQuantity = getMinQuantity(product);
  const discount = discountPercent(product);
  const images = [product.image, ...(product.gallery ?? [])].filter((image) => image !== undefined);
  const details = [
    ["Product ID", `#${product.id.toUpperCase()}`],
    ["Category", category?.name],
    ["Authenticity", "100% Genuine Imported Stock"],
    ["Delivery", "Discreet Packaging • COD"],
  ];

  return (
    // Pulled up by the navbar's height so the page sits behind the floating pill.
    <main className="-mt-20 flex-1 bg-[#faf8f5] pt-20 font-sans text-stone-950">
      <div className="mx-auto max-w-[1024px] px-6 pt-12 pb-14 xl:px-0">
        <nav aria-label="Breadcrumb" className="border-b border-stone-200 pb-4 font-mono text-[10px] tracking-wider text-stone-500 uppercase">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/#products" className="hover:text-stone-950">
                Store
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/${product.category}#products`} className="hover:text-stone-950">
                {category?.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-bold text-stone-950">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[380px_1fr] lg:gap-14 lg:pl-2.5">
          <ProductGallery images={images} name={product.name}>
            <div className="absolute inset-x-3 top-4 flex items-start justify-between gap-2">
              <span className={`${CHIP} border-stone-200 bg-white`}>{category?.name}</span>
              {discount > 0 && (
                <span className={`${CHIP} bg-brand border-transparent text-white`}>-{discount}%</span>
              )}
            </div>
          </ProductGallery>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[9px] tracking-widest text-stone-500 uppercase">
                Original Import
              </p>
              <p className="flex gap-2">
                {minQuantity > 1 && (
                  <span className={`${CHIP} bg-promo border-stone-200`}>Minimum {minQuantity} to buy</span>
                )}
                <span className={`${CHIP} border-transparent bg-emerald-100 text-emerald-800`}>In stock</span>
              </p>
            </div>

            <h1 className="font-display mt-6 text-3xl leading-[1.15] font-black uppercase [font-stretch:125%] sm:text-[38px]">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-5">
              <div>
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono">
                  <strong className="text-3xl">{formatPrice(product.price)}</strong>
                  {product.unit && <span className="text-sm text-stone-500">/ {product.unit}</span>}
                  {product.compareAtPrice && (
                    <s className="text-sm text-stone-400">{formatPrice(product.compareAtPrice)}</s>
                  )}
                  {discount > 0 && (
                    <span className="border-brand/30 text-brand border bg-red-50 px-2 py-0.5 text-[11px] font-bold uppercase">
                      {discount}% off
                    </span>
                  )}
                </p>
                {minQuantity > 1 && (
                  <p className="mt-2.5 font-mono text-[11px] text-stone-500">
                    <strong className="text-stone-950">
                      {formatPrice(minQuantity * product.price)} total ({minQuantity}{" "}
                      {unitLabel(product, minQuantity)})
                    </strong>{" "}
                    • Min. {minQuantity} {unitLabel(product, minQuantity)}
                  </p>
                )}
              </div>
              <p className="font-mono text-[10px] tracking-wider text-stone-500 uppercase">
                Cash on delivery available
              </p>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-stone-600">
              {product.description ?? "Dummy product description. Replace this in catalog.ts."}
            </p>

            <ProductPurchase product={product} />

            <p className="mt-4 border-b border-stone-200 pb-6 font-mono text-[9px] leading-relaxed text-stone-500">
              {minQuantity > 1 && `• Minimum order requirement: ${minQuantity} ${unitLabel(product, minQuantity)}. `}
              Sourced factory-sealed to guarantee freshness.
            </p>

            <Section title="Details" defaultOpen>
              <dl className="divide-y divide-stone-200 font-mono text-[10px]">
                {details.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                    <dt className="tracking-wider text-stone-500 uppercase">{label}</dt>
                    <dd className="text-right font-bold text-stone-950">{value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
            <Section title="Materials">
              {product.materials ?? "Dummy materials description. Replace this in catalog.ts."}
            </Section>
            <Section title="How to Order">
              Choose a bundle or quantity, add it to your bag, and review your order in the cart.
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
