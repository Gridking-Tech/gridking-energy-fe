import ApiSchema from "./services";

const api = new ApiSchema(process.env.NEXT_PUBLIC_APP_BASE_URL || "");

export const productsApi = {
  useGetProducts: () => api.useFetchRequest("LIST_PRODUCT", "/product"),
  useGetProductsById: (id: string) =>
    api.useFetchRequest(`SINGLE_PRODUCT_${id}`, `/product/${id}`),
  useGetCategory: () =>
    api.useFetchRequest("PRODUCT_CATEGORY", "/category"),
  useGetCategoryById: (id:number) =>
    api.useFetchRequest("PRODUCTID_CATEGORY", `/category/${id}/children`),
  useGetCategoryByProduct: (id:number) =>
    api.useFetchRequest("PRODUCT_CATEGORY", `category/${id}`),
  useGetDownload: () => api.useFetchRequest('PRODUCTS_DOWNLOADS','/download')
};
