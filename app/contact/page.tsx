import ClientContactSection from "./ClientContactSection";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact GridKing for solar solutions, product inquiries, and support. Find our location, email, and WhatsApp contact.",
  openGraph: {
    title: "Contact GridKing",
    description:
      "Contact GridKing for solar solutions, product inquiries, and support. Find our location, email, and WhatsApp contact.",
    url: "https://gridking.africa/contact",
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

export default function ContactPage() {
  return <ClientContactSection />;
}
