import ApiSchema from "../schemas/apiSchema";

const api = new ApiSchema("");

const galleryApi = {
  useGetgallery: () => api.useFetchRequest("PRODUCT_GALLERY", "/api/gallery"),
  useGetImages: () => api.useFetchRequest("PRODUCT_IMAGES", "/api/gallery"),
};

export default galleryApi;
