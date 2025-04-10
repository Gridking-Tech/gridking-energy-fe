import ApiSchema from "../schemas/apiSchema";

const api = new ApiSchema(process.env.NEXT_PUBLIC_APP_BASE_URL || "");

export const productsApi = {
  useGetProducts: () => api.useFetchRequest("LIST_PRODUCT", "/api/product"),
  useGetProductsById: (id: number) =>
    api.useFetchRequest(`SINGLE_PRODUCT_${id}`, `/api/product/${id}`),
  useGetCategory: () =>
    api.useFetchRequest("PRODUCT_CATEGORY", "/api/category"),
  useGetCategoryById: (id:number) =>
    api.useFetchRequest("PRODUCTID_CATEGORY", `/api/category/${id}/children`),
  useGetCategoryByProduct: (id:number) =>
    api.useFetchRequest("PRODUCT_CATEGORY", `/api/category/${id}`),
};
