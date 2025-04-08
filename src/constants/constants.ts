import { 
  FaLightbulb, FaFan, FaTv, FaDesktop, FaLaptop, FaMusic,
  FaSnowflake, FaGamepad, FaTooth 
} from 'react-icons/fa'
import { GiWashingMachine, GiToaster, GiVacuumCleaner, GiCooler } from 'react-icons/gi'
import { MdOutlineLight, MdOutlinePower } from 'react-icons/md'
import { TbFridge } from 'react-icons/tb'

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
        name: "Gel Battery",
        href: "/collections/gel",
        
        images: [
          "/assets/placeholders/products.png",

        ],
      },
      {
        name: "Lithium Battery",
        href: "/collections/lithium",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
     
      {
        name: "Front Terminal Telecom Battery",
        href: "/collections/front-terminal",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "OPZV Battery",
        href: "/collections/opzv",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "Inverters",
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
    disabled: true,
    images: [
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Car Charger",
        href: "/collections/car-charger",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "WiFi Module",
        href: "/collections/wifi-module",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
      {
        name: "Combiner Box",
        href: "/collections/combiner-box",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",
        ],
      },
    ],
  },
  {
    name: "MPPT Charge Controller",
    disabled: true,
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
    disabled: true,
    images: [
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
      "/assets/placeholders/products.png",
    ],
    subcategories: [
      {
        name: "Liquid Cooling System",
        href: "/collections/all-in-one-ess/liquid-cooling",
        disabled: true,
        images: [
          "/assets/placeholders/products.png",

        ],
      },
      {
        name: "Air Cooling System",
        href: "/collections/all-in-one-ess/air-cooling",
        disabled: true,
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
  // { name: "Blog", href: "/blog" },
  { name: "Download", href: "/collections/download" },
  // { name: "Technical Support", href: "/Technoical supprt" },
  // { name: "Anti-counterfieting Verify", href: "/anti-counterfieting verify" },
];

export const ContactLinks = [
  { name: "Branch Info", href: "/branch" },
  { name: "Host Office", href: "/host-office" },
];

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Product", href: "/productsoverview", constant: ProductsLinks },
  // { name: "Solution & Cases", href: "/solutions" },
  {
    name: "Support & Service",
    href: "/support",
    constant: SupportServiceLinks,
  },
  { name: "Contact Us", href: "/contact" },
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
    date: "Nov 20, 2023",
    image: [],
  },
  {
    id: 2,
    date: "Nov 16, 2023",
    image: [],
  },
  {
    id: 3,
    date: "Nov 16, 2023",
    image: [],
  },
];
type Appliance = {
  name: string
  quantity: number
  power: number
  icon: any
}

export const LoadAppliances: Appliance[] = [
  { name: "Normal Bulb", quantity: 0, power: 60, icon: FaLightbulb },
  { name: "Tube Light", quantity: 0, power: 40, icon: MdOutlineLight },
  { name: "LED Lamp", quantity: 0, power: 10, icon: FaLightbulb },
  { name: "Fan", quantity: 0, power: 75, icon: FaFan },
  { name: "Music System", quantity: 0, power: 100, icon: FaMusic },
  { name: "LCD/LED TV (< 42\")", quantity: 0, power: 80, icon: FaTv },
  { name: "LCD/LED TV (> 42\")", quantity: 0, power: 150, icon: FaTv },
  { name: "Desktop Computer", quantity: 0, power: 200, icon: FaDesktop },
  { name: "Laptop", quantity: 0, power: 65, icon: FaLaptop },
  { name: "Refrigerator (165–250Ltr)", quantity: 0, power: 150, icon: TbFridge },
  { name: "Refrigerator (250–350Ltr)", quantity: 0, power: 200, icon: TbFridge },
  { name: "Refrigerator (350–450Ltr)", quantity: 0, power: 250, icon: TbFridge },
  { name: "Refrigerator (> 450Ltr)", quantity: 0, power: 300, icon: TbFridge },
  { name: "AC – 1HP", quantity: 0, power: 1000, icon: FaSnowflake },
  { name: "AC – 1.5HP", quantity: 0, power: 1500, icon: FaSnowflake },
  { name: "AC – 2HP", quantity: 0, power: 2000, icon: FaSnowflake },
  { name: "Toaster", quantity: 0, power: 800, icon: GiToaster },
  { name: "Washing Machine", quantity: 0, power: 500, icon: GiWashingMachine },
  { name: "Gaming Console", quantity: 0, power: 150, icon: FaGamepad },
  { name: "Microwave Oven", quantity: 0, power: 1000, icon: GiWashingMachine }
]

import { FaSolarPanel, FaBatteryFull, FaBolt } from 'react-icons/fa'

export const productCategories = [
  {
    name: 'Inverter',
    description: 'Efficient and reliable inverter systems for your power needs.',
    icon: FaBolt,
    href: '/collections/inverters',
  },
  {
    name: 'Battery',
    description: 'Durable batteries for longer power backup.',
    icon: FaBatteryFull,
    href: '/collections/battery',
  },
  {
    name: 'Solar Panel',
    description: 'High-performance solar panels to harness the sun.',
    icon: FaSolarPanel,
    href: '/collections/solar-panel',
  },
];


