import ApiSchema from "./services";
import {  UseMutationOptions } from "@tanstack/react-query";
const api = new ApiSchema(process.env.NEXT_PUBLIC_APP_BASE_URL || "");

export const productsApi = {
  useGetProducts: () => api.useFetchRequest("LIST_PRODUCT", "/product"),
  
  useGetProductsById: (id: string) =>
    api.useFetchRequest(`SINGLE_PRODUCT_${id}`, `/product/${id}`),

  useGetCategory: () =>
    api.useFetchRequest("PRODUCT_CATEGORY", "/category"),

  useGetCategoryById: (id:string|number) =>
    api.useFetchRequest("PRODUCT_ID_CATEGORY", `/category/${id}/children`),

  useGetCategoryByProduct: (id:number) =>
    api.useFetchRequest("PRODUCT_CATEGORY", `category/${id}`),

  useGetDownload: () => api.useFetchRequest('PRODUCTS_DOWNLOADS','/download'),

  useSendQuote(options: UseMutationOptions<any, any, any> = {}) {
    return api.useSendRequest("post", "/quote/order",{}, options);
  }
};
