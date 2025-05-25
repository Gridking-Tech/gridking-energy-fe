import { IProduct } from "@/types";
import { useRouter } from "next/navigation";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailsDetails from "@/components/ProductDetailsDetails";

const ProductDetail = ({ product: p }: { product: IProduct }) => {
  return (
    <section className="py-32 bg-white-100 md:px-36 dark:bg-black/50 flex flex-col md:flex-row gap-6 border-none shadow-none">
      <div className="flex gap-4 w-full md:w-3/5">
        <ProductImageGallery images={product.images} />
      </div>
      <ProductDetailsDetails product={product} />
    </section>
  );
};

export default ProductDetail;

const product = {
  name: "2V 200Ah Gel Battery: Sample product",
  rating: "★★★★★ 9 Reviews",
  inStock: true,
  description:
    "Reliable and efficient. Ideal for solar and energy systems, it ensures stable, efficient power performance for both residential and commercial use.",
  images: [
    "/assets/products/Inverter_2kva_Primary-removebg-preview.png",
    "/assets/products/Inverter_2kva_var02-removebg-preview.png",
    "/assets/products/Inverter_3kva_var02-removebg-preview.png",
  ],
};
