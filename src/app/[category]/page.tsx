import { notFound } from "next/navigation";
import { StorePage } from "@/components/store-page";
import { CATEGORIES, getCategory } from "@/data/catalog";

// Unknown URLs stop at notFound() below, which instant validation reports as an
// error because the page never renders. Real categories are prerendered anyway.
export const instant = false;

export function generateStaticParams() {
  return CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category } = await params;
  if (!getCategory(category)) notFound();

  return <StorePage categorySlug={category} />;
}
