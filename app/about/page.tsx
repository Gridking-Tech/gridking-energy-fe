import ClientAboutSection from "./ClientAboutSection";

export const metadata = {
  title: "About Us",
  description:
    "Learn about GridKing, a next-gen clean energy company focused on solar and energy storage solutions for homes and businesses.",
  openGraph: {
    title: "About GridKing",
    description:
      "Learn about GridKing, a next-gen clean energy company focused on solar and energy storage solutions for homes and businesses.",
    url: "https://gridking.africa/about",
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

export default function AboutPage() {
  return <ClientAboutSection />;
}
