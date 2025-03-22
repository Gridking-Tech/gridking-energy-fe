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



