export const imagesArr = [
  '/assets/images/pexels-jakubzerdzicki-24194071.jpg',
  '/assets/images/pexels-vlada-karpovich-4050323.jpg',
  '/assets/images/pexels-ekaterina-bolovtsova-4049876.jpg',
  '/assets/images/pexels-goumbik-317377.jpg'
];

export const pageLinks = [
  { 
    name: 'Battery', 
    href: '/battery',
    subcategories: [
      { name: 'Lithium Battery', href: '/battery/lithium' },
      { name: 'Gel Battery', href: '/battery/gel' },
      { name: 'Front Terminal Telecom Battery', href: '/battery/front-terminal'},
      { name: 'OPZV Battery', href: '/battery/opzv' }
    ]
  },
  { 
    name: 'Inverter', 
    href: '/inverter',
    subcategories: [
      { name: 'Hybrid Inverter', href: '/inverter/hybrid' },
      { name: 'Off-Grid Inverter', href: '/inverter/off-grid' }
    ]
  },
  { 
    name: 'Solar Panel', 
    href: '/solar-panel'
  },
  { 
    name: 'Solar Light', 
    href: '/solar-light',
    subcategories: [
      { name: 'All-in-One Solar Street Light', href: '/solar-light/street-light' },
      { name: 'Flood Light', href: '/solar-light/flood-light' }
    ]
  },
  { 
    name: 'Accessories', 
    href: '/accessories',
    subcategories: [
      { name: 'Car Charger', href: '/accessories/car-charger' },
      { name: 'WiFi Module', href: '/accessories/wifi-module' },
      { name: 'Combiner Box', href: '/accessories/combiner-box' }
    ]
  },
  { 
    name: 'MPPT Charge Controller', 
    href: '/mppt-charge-controller'
  },
  { 
    name: 'All-in-One ESS', 
    href: '/all-in-one-ess',
    subcategories: [
      { name: 'Liquid Cooling System', href: '/all-in-one-ess/liquid-cooling' },
      { name: 'Air Cooling System', href: '/all-in-one-ess/air-cooling' }
    ]
  }
];


export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Product', href: '/product', constant: pageLinks },
  { name: 'Solution & Cases', href: '/solutions' },
  { name: 'Support & Service', href: '/support' },
  { name: 'Contact Us', href: '/contact' }
];


export const products = [
  { id: 1, name: 'IVGM10048', desc: '48V 10KW Solar Inverter', image: '/images/inverter1.png' },
  { id: 2, name: 'FLA24100', desc: '24V 100AH LiFePO4 battery', image: '/images/battery1.png' },
  { id: 3, name: 'MPPT4820', desc: 'MPPT Solar Charge Controller', image: '/images/controller1.png' },
  { id: 4, name: 'SPM400', desc: '400W Solar Panel', image: '/images/solar1.png' }
];


export const productTabs = [
  {
    name: "Inverter",
    images: ["/assets/images/pexels-alexander-mass-748453803-31243092.jpg", "/assets/images/pexels-maksgelatin-4352247.jpg", "/assets/images/pexels-vlada-karpovich-4050323.jpg"],
  },
  {
    name: "Lithium Battery",
    images: ["/assets/images/pexels-diva-31265845.jpg", "/assets/images/pexels-valeriya-kobzar-42371713-7407771.jpg", "/assets/images/pexels-valeriya-kobzar-42371713-7407771.jpg"],
  },
  {
    name: "MPPT",
    images: ["/assets/images/pexels-karolina-grabowska-8092506.jpg", "/assets/images/pexels-maksgelatin-4352247.jpg", "/assets/images/pexels-vlada-karpovich-4050323.jpg"],
  },
  {
    name: "Solar Panel",
    images: ["/assets/images/pexels-kseniachernaya-3965534.jpg", "/assets/images/pexels-maksgelatin-4352247 (1).jpg", "/assets/images/pexels-maksgelatin-4352247 (1).jpg"],
  },
  {
    name: "Solar Light",
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




