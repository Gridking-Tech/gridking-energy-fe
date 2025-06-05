import { IProduct } from "@/types";
import { useRouter } from "next/navigation";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailsDetails from "@/components/ProductDetailsDetails";

const ProductDetail = ({ product }: { product: IProduct }) => {
  return (
    <section className="py-32 bg-white-100 md:px-36 dark:bg-black/50 flex flex-col md:flex-row gap-6 border-none shadow-none">
      <div className="flex gap-4 w-full md:w-3/5">
        <ProductImageGallery images={product?.images} />
      </div>
      <ProductDetailsDetails product={product} />
    </section>
  );
};

export default ProductDetail;
