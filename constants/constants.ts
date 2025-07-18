export const imagesArr = [];

export const ProductsLinks = [
  {
    name: "Battery",
    slug: "gel-battery",
    href: "/categories/gel-battery",
    images: [
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Gel Battery",
        slug: "gel-battery",
        href: "/categories/gel-battery",
        images: [
          "/assets/placeholders/products.png",

        ],
      },

      {
        name: "Lithium Battery",
        slug: "lithium-battery",
        href: "/categories/lithium-battery",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "Inverter", 
    slug: "inverter", 
    href: "/categories/inverter",
    images: [
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Hybrid Inverter",
        slug: "inverter", 
        href: "/categories/inverter", 
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "Off-Grid Inverter",
        slug: "off-grid-inverter",
        href: "/categories/off-grid-inverter",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "Solar Panel",
    slug: "solar-panel",
    href: "/categories/solar-panel",
    images: [
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Off Grid Panels",
        slug: "off-grid-panels",
        href: "/categories/off-grid-panels",
        disabled: true,
      },
    ],
  },

];

export const SupportServiceLinks = [
  {
    name: "Download Manuals", href: "/download",routes:false, subcategories: [

    ],
  },
];

export const ContactLinks = [
  { name: "Branch Info", href: "/branch" },
  { name: "Host Office", href: "/host-office" },
];

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Product", href: "", constant: ProductsLinks },
  { name: "About Us", href: "/about" },
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



