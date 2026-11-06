"use client";

import { addToCart } from "@/lib/cart";

export function AddToCartButton({
  productId,
  productName,
  minQuantity,
}: {
  productId: string;
  productName: string;
  minQuantity: number;
}) {
  const amount = minQuantity > 1 ? `${minQuantity} ` : "";

  return (
    <button
      type="button"
      onClick={() => addToCart(productId)}
      aria-label={`Add ${amount}${productName} to cart`}
      className="mt-4 w-full rounded-sm bg-stone-950 px-3 py-2.5 font-mono text-[10px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
    >
      {minQuantity > 1 ? `Add ${minQuantity} to Cart` : "Add to Cart"}
    </button>
  );
}
