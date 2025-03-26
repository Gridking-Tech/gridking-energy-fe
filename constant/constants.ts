export const imagesArr = [
  '/assets/images/pexels-jakubzerdzicki-24194071.jpg',
  '/assets/images/pexels-vlada-karpovich-4050323.jpg',
  '/assets/images/pexels-ekaterina-bolovtsova-4049876.jpg',
  '/assets/images/pexels-goumbik-317377.jpg'
];
export const ProductsLinks = [
  {
    name: 'Battery',
    href: '/collections/battery',
    subcategories: [
      { 
        name: 'Lithium Battery', 
        href: '/collections/lithium',
        images: ['/assets/images/pexels-diva-31265845.jpg', '/assets/images/pexels-valeriya-kobzar-42371713-7407771.jpg']
      },
      { 
        name: 'Gel Battery', 
        href: '/collections/gel',
        images: ['/assets/images/pexels-alexander-mass-748453803-31243092.jpg', '/assets/images/pexels-maksgelatin-4352247.jpg']
      },
      { 
        name: 'Front Terminal Telecom Battery', 
        href: '/collections/front-terminal',
        images: ['/assets/images/pexels-karolina-grabowska-8092506.jpg', '/assets/images/pexels-maksgelatin-4352247.jpg']
      },
      { 
        name: 'OPZV Battery', 
        href: '/collections/opzv',
        images: ['/assets/images/pexels-kseniachernaya-3965534.jpg', '/assets/images/pexels-vlada-karpovich-4050323.jpg']
      }
    ]
  },
  {
    name: 'Inverter',
    href: '/collections/inverter',
    subcategories: [
      { 
        name: 'Hybrid Inverter', 
        href: '/collections/hybrid',
        images: ['/assets/images/pexels-maksgelatin-4352247.jpg', '/assets/images/pexels-alexander-mass-748453803-31243092.jpg']
      },
      { 
        name: 'Off-Grid Inverter', 
        href: '/collections/off-grid',
        images: ['/assets/images/pexels-valeriya-kobzar-42371713-7407771.jpg', '/assets/images/pexels-maksgelatin-4352247.jpg']
      }
    ]
  },
  {
    name: 'Solar Panel',
    href: '/collections/solar-panel',
    images: ['/assets/images/pexels-kseniachernaya-3965534.jpg', '/assets/images/pexels-maksgelatin-4352247 (1).jpg']
  },
  {
    name: 'Solar Light',
    href: '/collections/solarlight',
    subcategories: [
      { 
        name: 'All-in-One Solar Street Light', 
        href: '/collections/street-light',
        images: ['/assets/images/pexels-maksgelatin-4352247 (1).jpg', '/assets/images/pexels-maksgelatin-4352247 (2).jpg']
      },
      { 
        name: 'Flood Light', 
        href: '/collections/flood-light',
        images: ['/assets/images/pexels-maksgelatin-4352247.jpg', '/assets/images/pexels-vlada-karpovich-4050323.jpg']
      }
    ]
  },
  {
    name: 'Accessories',
    href: '/collections/accessories',
    subcategories: [
      { 
        name: 'Car Charger', 
        href: '/collections/car-charger',
        images: ['/assets/images/pexels-karolina-grabowska-8092506.jpg', '/assets/images/pexels-vlada-karpovich-4050323.jpg']
      },
      { 
        name: 'WiFi Module', 
        href: '/collectionss/wifi-module',
        images: ['/assets/images/pexels-alexander-mass-748453803-31243092.jpg', '/assets/images/pexels-kseniachernaya-3965534.jpg']
      },
      { 
        name: 'Combiner Box', 
        href: '/collections/combiner-box',
        images: ['/assets/images/pexels-maksgelatin-4352247.jpg', '/assets/images/pexels-valeriya-kobzar-42371713-7407771.jpg']
      }
    ]
  },
  {
    name: 'MPPT Charge Controller',
    href: '/collections/mppt-charge-controller',
    images: ['/assets/images/pexels-karolina-grabowska-8092506.jpg', '/assets/images/pexels-maksgelatin-4352247.jpg']
  },
  {
    name: 'All-in-One ESS',
    href: '/collections/all-in-one-ess',
    subcategories: [
      { 
        name: 'Liquid Cooling System', 
        href: 'collections/all-in-one-ess/liquid-cooling',
        images: ['/assets/images/pexels-diva-31265845.jpg', '/assets/images/pexels-maksgelatin-4352247 (1).jpg']
      },
      { 
        name: 'Air Cooling System', 
        href: 'collection/all-in-one-ess/air-cooling',
        images: ['/assets/images/pexels-kseniachernaya-3965534.jpg', '/assets/images/pexels-valeriya-kobzar-42371713-7407771.jpg']
      }
    ]
  }
];

export const SupportServiceLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Download', href: '/download' },
  { name: 'Technical Support', href: '/Technoical supprt' },
  { name: 'Anti-counterfieting Verify', href: '/anti-counterfieting verify' }
]

export const ContactLinks = [
  { name: 'Branch Info', href: '/branch' },
  { name: 'Host Office', href: '/host-office' }
]

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Product', href: '/product', constant: ProductsLinks },
  { name: 'Solution & Cases', href: '/solutions', },
  { name: 'Support & Service', href: '/support', constant: SupportServiceLinks },
  { name: 'Contact Us', href: '/contact', constant: ContactLinks }
];




export const products = [
  { id: 1, name: 'IVGM10048', desc: '48V 10KW Solar Inverter', image: '/assets/images/pexels-alexander-mass-748453803-31243092.jpg' },
  { id: 2, name: 'FLA24100', desc: '24V 100AH LiFePO4 battery', image: '/assets/images/pexels-diva-31265845.jpg' },
  { id: 3, name: 'MPPT4820', desc: 'MPPT Solar Charge Controller', image: '/assets/images/pexels-kseniachernaya-3965534.jpg' },
  { id: 4, name: 'SPM400', desc: '400W Solar Panel', image: '/assets/images/pexels-vlada-karpovich-4050323.jpg' }
];



export const productTabs = [
  {
    name: "Inverter",
    id: 1,
    images: ["/assets/images/pexels-alexander-mass-748453803-31243092.jpg", "/assets/images/pexels-maksgelatin-4352247.jpg", "/assets/images/pexels-vlada-karpovich-4050323.jpg"],
  },
  {
    name: "Battery",
    id: 2,
    images: ["/assets/images/pexels-diva-31265845.jpg", "/assets/images/pexels-valeriya-kobzar-42371713-7407771.jpg", "/assets/images/pexels-valeriya-kobzar-42371713-7407771.jpg"],
  },
  {
    name: "MPPT",
    id: 3,
    images: ["/assets/images/pexels-karolina-grabowska-8092506.jpg", "/assets/images/pexels-maksgelatin-4352247.jpg", "/assets/images/pexels-vlada-karpovich-4050323.jpg"],
  },
  {
    name: "Solar-Panel",
    id: 4,
    images: ["/assets/images/pexels-kseniachernaya-3965534.jpg", "/assets/images/pexels-maksgelatin-4352247 (1).jpg", "/assets/images/pexels-maksgelatin-4352247 (1).jpg"],
  },
  {
    name: "Solar-Light",
    id: 5,
    images: ["/assets/images/pexels-maksgelatin-4352247 (1).jpg", "/assets/images/pexels-maksgelatin-4352247 (2).jpg", "/assets/images/pexels-maksgelatin-4352247.jpg"],
  },
];

export const newsItems = [
  {
    id: 1,
    // title: 'Felicity Solar Myanmar Branch Opens its New Showroom',
    date: 'Nov 20, 2023',
    image: '/assets/images/pexels-jakubzerdzicki-24194071.jpg',
  },
  {
    id: 2,
    // title: 'Worth More Than US$10 Million Solar Power Products Donated to Kayin Yew Children’s Center in Myanmar',
    date: 'Nov 16, 2023',
    image: '/assets/images/pexels-vlada-karpovich-4050323.jpg',
  },
  {
    id: 3,
    // title: 'Felicity Solar Shines at the Peru Solar Show, Injecting New Green Energy into the South American Market',
    date: 'Nov 16, 2023',
    image: '/assets/images/pexels-kseniachernaya-3965534.jpg',
  },
];




