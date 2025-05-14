import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';


const ProductSection: React.FC = () => {

  const router = useRouter()

  const products = [
    {
      image: 'https://via.placeholder.com/200x150?text=10kW+Hybrid+Battery',
      title: '10kW Hybrid Lithium Ion Battery',
      rating: '★★★★★ (99%)',
      isNew: true,
      to: '/product/10kw-hybrid-battery',
      id: '1',
    },
    {
      image: 'https://via.placeholder.com/200x150?text=SP+Series+Inverter',
      title: 'SP Series 1800W 3000W 3800W Off Grid Solar Inverter',
      rating: '★★★★★ (129)',
      isNew: true,
      to: '/product/sp-series-inverter',
      id: '2',
    },
    {
      image: 'https://via.placeholder.com/200x150?text=LiFePO4+Battery',
      title: 'LiFePO4 Battery 50 Ah 12V 200Ah Solar Battery 48V',
      rating: '★★★★★ (75)',
      isNew: true,
      to: '/product/lifepo4-battery',
      id: '3',
    },
    {
      image: 'https://via.placeholder.com/200x150?text=SP+Series+Inverter+80A',
      title: 'SP Series Inverter 80A 50V-450V',
      rating: '★★★★★ (99)',
      isNew: true,
      to: '/product/sp-series-inverter-80a',
      id: '4',
    },
  ];

  const handleCardClick = (title_id: string) => {
    router.push(`/products/${title_id?.replace(/\s+/g, '-')}`);
  };

  return (
    <section className="py-8 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 pl-4 border-l-4 border-gray-800">
          Powering Homes and Businesses with Excellence
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleCardClick(product.title+" "+product.id)}
            >
              <CardHeader className="relative">
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">{product.title}</CardTitle>
                <CardDescription className="text-yellow-500 text-sm mb-2">
                  {product.rating}
                </CardDescription>
              </CardContent>
              <CardFooter className="justify-center">
                <button className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors">
                  View Details
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
            Explore Our Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;