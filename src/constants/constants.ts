import { image } from "framer-motion/client";

export const imagesArr = [];

export const ProductsLinks = [
  {
    name: "Battery",
    href: "/collections/battery",
    subcategories: [
      {
        name: "Lithium Battery",
        href: "/collections/lithium",
        images: [],
      },
      {
        name: "Gel Battery",
        href: "/collections/gel",
        images: [],
      },
      {
        name: "Front Terminal Telecom Battery",
        href: "/collections/front-terminal",
        images: [],
      },
      {
        name: "OPZV Battery",
        href: "/collections/opzv",
        images: [],
      },
    ],
  },
  {
    name: "Inverter",
    href: "/collections/inverter",
    subcategories: [
      {
        name: "Hybrid Inverter",
        href: "/collections/hybrid",
        images: [],
      },
      {
        name: "Off-Grid Inverter",
        href: "/collections/off-grid",
        images: [],
      },
    ],
  },
  {
    name: "Solar Panel",
    href: "/collections/solar-panel",
    images: [],
  },
  {
    name: "Solar Light",
    href: "/collections/solarlight",
    subcategories: [
      {
        name: "All-in-One Solar Street Light",
        href: "/collections/street-light",
        images: [],
      },
      {
        name: "Flood Light",
        href: "/collections/flood-light",
        images: [],
      },
    ],
  },
  {
    name: "Accessories",
    href: "/collections/accessories",
    subcategories: [
      {
        name: "Car Charger",
        href: "/collections/car-charger",
        images: [],
      },
      {
        name: "WiFi Module",
        href: "/collectionss/wifi-module",
        images: [],
      },
      {
        name: "Combiner Box",
        href: "/collections/combiner-box",
        images: [],
      },
    ],
  },
  {
    name: "MPPT Charge Controller",
    href: "/collections/mppt-charge-controller",
    images: [],
  },
  {
    name: "All-in-One ESS",
    href: "/collections/all-in-one-ess",
    subcategories: [
      {
        name: "Liquid Cooling System",
        href: "collections/all-in-one-ess/liquid-cooling",
        images: [],
      },
      {
        name: "Air Cooling System",
        href: "collection/all-in-one-ess/air-cooling",
        images: [],
      },
    ],
  },
];

export const SupportServiceLinks = [
  { name: "Blog", href: "/blog" },
  { name: "Download", href: "/download" },
  { name: "Technical Support", href: "/Technoical supprt" },
  { name: "Anti-counterfieting Verify", href: "/anti-counterfieting verify" },
];

export const ContactLinks = [
  { name: "Branch Info", href: "/branch" },
  { name: "Host Office", href: "/host-office" },
];

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Product", href: "/product", constant: ProductsLinks },
  { name: "Solution & Cases", href: "/solutions" },
  {
    name: "Support & Service",
    href: "/support",
    constant: SupportServiceLinks,
  },
  { name: "Contact Us", href: "/contact", constant: ContactLinks },
];

export const products = [
  { id: 1, name: "IVGM10048", desc: "48V 10KW Solar Inverter", image: "" },
  { id: 2, name: "FLA24100", desc: "24V 100AH LiFePO4 battery", image: "" },
  { id: 3, name: "MPPT4820", desc: "MPPT Solar Charge Controller", image: "" },
  { id: 4, name: "SPM400", desc: "400W Solar Panel", image: "" },
];

export const productTabs = [
  {
    name: "Inverter",
    id: 1,
  },
  {
    name: "Battery",
    id: 2,
  },
  {
    name: "MPPT",
    id: 3,
  },
  {
    name: "Solar-Panel",
    id: 4,
  },
  {
    name: "Solar-Light",
    id: 5,
  },
];

export const newsItems = [
  {
    id: 1,
    // title: 'Felicity Solar Myanmar Branch Opens its New Showroom',
    date: "Nov 20, 2023",
    image: [],
  },
  {
    id: 2,
    // title: 'Worth More Than US$10 Million Solar Power Products Donated to Kayin Yew Children’s Center in Myanmar',
    date: "Nov 16, 2023",
    image: [],
  },
  {
    id: 3,
    // title: 'Felicity Solar Shines at the Peru Solar Show, Injecting New Green Energy into the South American Market',
    date: "Nov 16, 2023",
    image: [],
  },
];
