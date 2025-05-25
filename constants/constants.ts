

export const imagesArr = [];

export const ProductsLinks = [
  {
    name: "Battery",
    href: "/categories",
    images: [
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Gel Battery",
        href: "/categories",

        images: [
          "/assets/placeholders/products.png",

        ],
      },

      {
        name: "Lithium Battery",
        href: "/categories",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "Inverters",
    href: "/categories",
    images: [
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Hybrid Inverter",
        href: "/categories",
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "Off-Grid Inverter",
        href: "/categories",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "Solar Panel",
    href: "/categories",
    images: [
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Off Grid Panels",
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
  // { name: "Blog", href: "/blog" },
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



