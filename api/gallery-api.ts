import ApiSchema from "./services";

const api = new ApiSchema(process.env.NEXT_PUBLIC_APP_BASE_URL);

const galleryApi = {
  useGetgallery: () => api.useFetchRequest("PRODUCT_GALLERY", "/api/gallery"),
  useGetImages: () => api.useFetchRequest("PRODUCT_IMAGES", "/api/gallery"),
};
export default galleryApi;