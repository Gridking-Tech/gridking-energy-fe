import { image } from "framer-motion/client";

export const imagesArr = [];

export const ProductsLinks = [
  {
    name: "Battery",
    href: "/collections/battery",
    images: [
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Lithium Battery",
        href: "/collections/lithium",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "Gel Battery",
        href: "/collections/gel",
        images: [
          "/assets/placeholders/products.png",

        ],
      },
      {
        name: "Front Terminal Telecom Battery",
        href: "/collections/front-terminal",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "OPZV Battery",
        href: "/collections/opzv",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "Inverter",
    href: "/collections/inverter",
    images: [
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Hybrid Inverter",
        href: "/collections/hybrid",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "Off-Grid Inverter",
        href: "/collections/off-grid",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "Solar Panel",
    href: "/collections/solar-panel",
    images: [
      "/assets/placeholders/products.png",
    ],
  },
  {
    name: "Solar Light",
    href: "/collections/solarlight",
    images: [
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "All-in-One Solar Street Light",
        href: "/collections/street-light",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "Flood Light",
        href: "/collections/flood-light",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "Accessories",
    href: "/collections/accessories",
    images: [
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Car Charger",
        href: "/collections/car-charger",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "WiFi Module",
        href: "/collections/wifi-module",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "Combiner Box",
        href: "/collections/combiner-box",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "MPPT Charge Controller",
    href: "/collections/mppt-charge-controller",
    images: [
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
    ],
  },
  {
    name: "All-in-One ESS",
    href: "/collections/all-in-one-ess",
    images: [
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Liquid Cooling System",
        href: "/collections/all-in-one-ess/liquid-cooling",
        images: [
          "/assets/placeholders/products.png",

        ],
      },
      {
        name: "Air Cooling System",
        href: "/collections/all-in-one-ess/air-cooling",
        images: [
          "/assets/placeholders/products.png",
          "/assets/placeholders/products.png",
          "/assets/placeholders/products.png",
        ],
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
