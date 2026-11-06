import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { discountPercent, formatPrice, getCategory, getMinQuantity, type Product } from "@/data/catalog";

const CHIP = "border border-stone-200 bg-white px-2 py-1 font-mono text-[9px] font-bold tracking-wider uppercase";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const { price, compareAtPrice } = product;
  const discount = discountPercent(product);
  const href = `/products/${product.id}`;

  return (
    <article className="overflow-hidden rounded-sm border border-stone-200 bg-white">
      <Link
        href={href}
        aria-hidden="true"
        tabIndex={-1}
        className="relative block aspect-square bg-stone-100"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-mono text-[10px] tracking-widest text-stone-400 uppercase">
            Image coming soon
          </span>
        )}
        <span className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className={CHIP}>{category?.name}</span>
          {(product.tag || discount > 0) && (
            <span className={CHIP}>{product.tag ?? `-${discount}%`}</span>
          )}
        </span>
      </Link>

      <div className="border-t border-stone-200 p-4">
        <h3 className="font-display text-sm font-bold tracking-tight uppercase">
          <Link
            href={href}
            className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 font-mono text-sm font-bold">
          {formatPrice(price)}
          {product.unit && <span className="font-normal text-stone-500"> / {product.unit}</span>}
          {compareAtPrice && (
            <s className="ml-2 font-normal text-stone-400">{formatPrice(compareAtPrice)}</s>
          )}
        </p>
        <AddToCartButton
          productId={product.id}
          productName={product.name}
          minQuantity={getMinQuantity(product)}
        />
      </div>
    </article>
  );
}
