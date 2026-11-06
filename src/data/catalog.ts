/**
 * The store's catalogue. Everything on the shop pages is generated from this file.
 *
 * To add a product: add an entry to PRODUCTS.
 * To add its image: put the file in public/products/ and set image, for example
 * image: "/products/my-product.jpg". Without an image, a placeholder is shown.
 * Category images work the same way, from public/categories/.
 */

export type Category = {
  /** Used in the page URL, for example /cigar. */
  slug: string;
  name: string;
  /** Yellow line above the name on the category card. */
  tagline: string;
  description: string;
  image?: string;
  /** Tailwind gradient shown until an image is set. */
  placeholder: string;
  featured?: boolean;
};

export type Product = {
  id: string;
  name: string;
  /** Must match a Category slug. Used for the product's breadcrumb and card label. */
  category: string;
  /** Other categories whose pages also list this product. */
  alsoListedIn?: string[];
  /** Price in dollars. */
  price: number;
  /** Original price. When set, the card shows the old price and a discount badge. */
  compareAtPrice?: number;
  /** Text shown after the price, for example "pack". */
  unit?: string;
  image?: string;
  /** More images, shown after image on the product page. */
  gallery?: string[];
  /** Short label on the card, for example "$12 / pack". */
  tag?: string;
  /** Shown on the product page. */
  description?: string;
  /** Shown under "Materials" on the product page. */
  materials?: string;
  /** Fewest that can be bought at once. Defaults to 1. */
  minQuantity?: number;
  /** How many make a carton. Adds the bundle options, and full cartons count towards CARTON_DEAL. */
  cartonSize?: number;
};

export const CATEGORIES: Category[] = [
  {
    slug: "imported-cigarettes",
    name: "Imported Cigarettes",
    tagline: "Manchester, Esse, Marlboro & more",
    description: "Cartons of 10 packs (200 sticks)",
    placeholder: "from-red-800 via-red-950 to-stone-950",
    featured: true,
  },
  {
    slug: "disposable-vapes",
    name: "Disposable Vapes",
    tagline: "AliBarbar & Iget",
    description: "Master boxes of 10 devices",
    placeholder: "from-violet-500 via-indigo-900 to-stone-950",
  },
  {
    slug: "pouches",
    name: "Pouches (Rolling Cig)",
    tagline: "Violin, Golden Leaf & Ventti",
    description: "Bundles of 5",
    placeholder: "from-stone-400 via-stone-600 to-stone-900",
  },
  {
    slug: "cigar",
    name: "Cigar",
    tagline: "Mac, Oscar, Double Happiness & more",
    description: "Cartons of 10 packs (200 sticks)",
    placeholder: "from-amber-900 via-stone-800 to-stone-950",
  },
];

const MATERIALS =
  "Genuine imported blend and premium hardware. Sealed in original factory packaging to ensure freshness and authenticity.";

export const PRODUCTS: Product[] = [
  {
    id: "ef48a5",
    name: "MANCHESTER SAPPHIRE BLUE",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/manshester-sapphire-blue-ef48a5/01.png",
    gallery: ["/products/manshester-sapphire-blue-ef48a5/02.png"],
    description: "Premium imported Virginia blend cigarette with a refined, smooth draw and distinctive Sapphire Blue seal.",
    materials: MATERIALS,
  },
  {
    id: "ef48a6",
    name: "MANCHESTER SPECIAL EDITION",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/manshester-special-edition-ef48a6/01.png",
    gallery: ["/products/manshester-special-edition-ef48a6/02.png"],
    description: "Special edition crafted blend featuring selected sun-cured and toasted tobacco leaves for a rich, balanced aroma.",
    materials: MATERIALS,
  },
  {
    id: "ef48a7",
    name: "MANCHESTER LIGHT",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/manshester-light-ef48a7/01.png",
    gallery: ["/products/manshester-light-ef48a7/02.png"],
    description: "Mellow, smooth profile engineered for a clean finish and delicate tobacco nuances with reduced intensity.",
    materials: MATERIALS,
  },
  {
    id: "ef48a8",
    name: "MANCHESTER RED",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/manshester-red-ef48a8/01.png",
    gallery: ["/products/manshester-red-ef48a8/02.png"],
    description: "Classic full-flavor profile with bold, robust toasted tobacco undertones and an uncompromising draw.",
    materials: MATERIALS,
  },
  {
    id: "ef48a9",
    name: "MANCHESTER BLUE CRUSH",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/manshester-blue-crush-ef48a9/01.png",
    gallery: ["/products/manshester-blue-crush-ef48a9/02.png"],
    description: "Dual-sensation capsule filter releasing an invigorating icy mint rush upon activation.",
    materials: MATERIALS,
  },
  {
    id: "ef48aa",
    name: "MANCHESTER GREEN CRUSH",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/manshester-green-crush-ef48aa/01.png",
    gallery: ["/products/manshester-green-crush-ef48aa/02.png"],
    description: "Crisp menthol infusion with crush-activated spearmint capsule for a double burst of cooling sensation.",
    materials: MATERIALS,
  },
  {
    id: "ef48ab",
    name: "MANCHESTER DOUBLE DRIVE",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/manshester-double-drive-ef48ab/01.png",
    gallery: ["/products/manshester-double-drive-ef48ab/02.png"],
    description: "Advanced dual-capsule filter system offering customizable fruit and mint switch flavors on demand.",
    materials: MATERIALS,
  },
  {
    id: "ef48ac",
    name: "DOUBLE HAPPINESS",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/double-happiness-ef48ac/01.png",
    gallery: ["/products/double-happiness-ef48ac/02.png"],
    description: "Traditional oriental cured Virginia tobacco renowned for its rich heritage, deep aroma, and iconic packaging.",
    materials: MATERIALS,
  },
  {
    id: "ef48ad",
    name: "MARLBORO RED",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/malboro-red-ef48ad/01.png",
    gallery: ["/products/malboro-red-ef48ad/02.png"],
    description: "World-renowned full-bodied American blend. Bold, rich flavor and signature red chevron crest.",
    materials: MATERIALS,
  },
  {
    id: "ef48ae",
    name: "MARLBORO GOLD",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/malboro-gold-ef48ae/01.png",
    gallery: ["/products/malboro-gold-ef48ae/02.png"],
    description: "Smooth, refined golden tobacco blend offering a polished character and balanced, mellow draw.",
    materials: MATERIALS,
  },
  {
    id: "ef48af",
    name: "DUNHILL BLUE",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/dunhil-blue-ef48af/01.png",
    gallery: ["/products/dunhil-blue-ef48af/02.png"],
    description: "Distinguished luxury blend with Reloc lock-in freshness seal and velvety Virginia tobacco leaves.",
    materials: MATERIALS,
  },
  {
    id: "ef48b0",
    name: "MAC ICE",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/mac-ice-ef48b0/01.png",
    gallery: ["/products/mac-ice-ef48b0/02.png"],
    description: "Ultra-cool menthol filter delivering an instant polar frost rush with balanced tobacco base notes.",
    materials: MATERIALS,
  },
  {
    id: "ef48b1",
    name: "ESSE LIGHT",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/esse-light-ef48b1/01.png",
    gallery: ["/products/esse-light-ef48b1/02.png"],
    description: "Slimline premium cigarette featuring ultra-refined charcoal filtering for a clean, light smoking experience.",
    materials: MATERIALS,
  },
  {
    id: "ef48b2",
    name: "ESSE MENTHOL",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/esse-menthol-ef48b2/01.png",
    gallery: ["/products/esse-menthol-ef48b2/02.png"],
    description: "Super-slim menthol format combining aromatic herbal freshness with an exceptionally smooth draw.",
    materials: MATERIALS,
  },
  {
    id: "ef48b3",
    name: "OSCAR",
    category: "imported-cigarettes",
    alsoListedIn: ["cigar"],
    price: 12,
    compareAtPrice: 17.14,
    unit: "pack",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/oscar-ef48b3/01.png",
    gallery: ["/products/oscar-ef48b3/02.png"],
    description: "Classic European fine blend with aromatic toasted Virginia notes and smooth, even burn.",
    materials: MATERIALS,
  },
  {
    id: "ef48b8",
    name: "ALIBARBAR 9000 PUFFS",
    category: "disposable-vapes",
    price: 45,
    compareAtPrice: 64.29,
    unit: "device",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/ali-barbar-9000-puffs-ef48b8/01.png",
    gallery: ["/products/ali-barbar-9000-puffs-ef48b8/02.png"],
    description: "High-capacity 9,000 puff disposable device featuring mesh coil vapor technology, vibrant flavor delivery, and Type-C rechargeable battery.",
    materials: MATERIALS,
  },
  {
    id: "ef48b9",
    name: "IGET PRO 9000 TO 12000 PUFFS",
    category: "disposable-vapes",
    price: 70,
    compareAtPrice: 100,
    unit: "device",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/iget-one-9000-to-12000-puffs-ef48b9/01.png",
    description: "Flagship smart disposable device with dual power modes delivering up to 12,000 puffs, digital LED screen, and ultra-rich e-liquid capacity.",
    materials: MATERIALS,
  },
  {
    id: "ef48ba",
    name: "IGET BAR PRO 10000 PUFFS",
    category: "disposable-vapes",
    price: 45,
    compareAtPrice: 64.29,
    unit: "device",
    minQuantity: 10,
    cartonSize: 10,
    image: "/products/bar-pro-1000-puffs-ef48ba/01.png",
    description: "Compact, ergonomic pocket disposable vape offering 10,000 puffs of instant satisfying flavor with leak-proof design.",
    materials: MATERIALS,
  },
  {
    id: "ef48b4",
    name: "VENTTI BLUE 100 CHARBON FILTER TUBES",
    category: "pouches",
    price: 30,
    compareAtPrice: 42.86,
    unit: "box",
    minQuantity: 5,
    cartonSize: 5,
    image: "/products/ventti-blue-100-cigarettes-ef48b4/01.png",
    description: "Box of 100 charbon filter tubes in Ventti Blue, for filling with your own rolling tobacco.",
    materials: MATERIALS,
  },
  {
    id: "ef48b5",
    name: "VENTTI RED 100 REGULAR FILTER TUBES",
    category: "pouches",
    price: 30,
    compareAtPrice: 42.86,
    unit: "box",
    minQuantity: 5,
    cartonSize: 5,
    image: "/products/ventti-red-100-cigarettes-ef48b5/01.png",
    description: "Box of 100 regular filter tubes in Ventti Red, for filling with your own rolling tobacco.",
    materials: MATERIALS,
  },
  {
    id: "ef48b6",
    name: "GOLDEN LEAF 50G",
    category: "pouches",
    price: 25,
    compareAtPrice: 35.71,
    unit: "pouch",
    minQuantity: 5,
    cartonSize: 5,
    image: "/products/golden-leaf-50g-ef48b6/01.png",
    description: "50-gram pouch of premium golden fine-cut rolling tobacco. Naturally sweet Virginia leaf, moisture-sealed.",
    materials: MATERIALS,
  },
  {
    id: "fe48f3",
    name: "VIOLIN ORIGINAL 40G",
    category: "pouches",
    price: 30,
    compareAtPrice: 42.86,
    unit: "pouch",
    minQuantity: 5,
    cartonSize: 5,
    image: "/products/violin-original-40g-fe48f3/01.png",
    description: "Authentic 40g pouch of Violin Original TIS (New Spirit) fine-cut rolling tobacco. Rich aromatic leaf blend, moisture-sealed for freshness. Minimum order 5 pouches.",
    materials: MATERIALS,
  },
];

/** The discount applies once per full set, so 4 cartons earn it twice. */
export const CARTON_DEAL = { cartons: 2, discount: 20 };

export function dealDiscount(cartons: number) {
  return Math.floor(cartons / CARTON_DEAL.cartons) * CARTON_DEAL.discount;
}

export function cartonCount(product: Product, quantity: number) {
  return product.cartonSize ? Math.floor(quantity / product.cartonSize) : 0;
}

export function getMinQuantity(product: Product) {
  return product.minQuantity ?? 1;
}

export function discountPercent({ price, compareAtPrice }: Product) {
  return compareAtPrice ? Math.round((1 - price / compareAtPrice) * 100) : 0;
}

/** "pack" or "packs", "pouch" or "pouches", "box" or "boxes", depending on the quantity. */
export function unitLabel(product: Product, quantity: number) {
  const unit = product.unit ?? "item";
  if (quantity === 1) return unit;
  return unit.endsWith("ch") || unit.endsWith("x") ? `${unit}es` : `${unit}s`;
}

export function formatPrice(price: number) {
  return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

export function getProduct(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getProducts(categorySlug?: string) {
  return categorySlug
    ? PRODUCTS.filter(
        ({ category, alsoListedIn }) =>
          category === categorySlug || alsoListedIn?.includes(categorySlug),
      )
    : PRODUCTS;
}
