import ApiSchema from "./apiSchema";

const api = new ApiSchema(process.env.NEXT_PUBLIC_APP_BASE_URL || "");

export const productsApi = {
  useGetProducts: () => api.useFetchRequest("LIST_PRODUCT", "/api/product"),
  useGetProductsById: (id: number) =>
    api.useFetchRequest(`SINGLE_PRODUCT_${id}`, `/api/product/${id}`),
  useGetCategory: () => api.useFetchRequest("PRODUCT_CATEGORY", "/api/category"),
};
