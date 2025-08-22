import ClientCategoriesSection from "./ClientCategoriesSection";

export const metadata = {
  title: "Product Categories",
  description:
    "Browse GridKing's range of solar products and clean energy solutions by category.",
  openGraph: {
    title: "Product Categories",
    description:
      "Browse GridKing's range of solar products and clean energy solutions by category.",
    url: "https://gridking.africa/categories",
    images: [
      {
        url: "/assets/placeholders/GD001.png",
        width: 1200,
        height: 630,
        alt: "Gridking Solar Solutions",
      },
    ],
  },
};

export default function CategoriesPage() {
  return <ClientCategoriesSection />;
}
