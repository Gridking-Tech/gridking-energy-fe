import ApiSchema from "../schemas/apiSchema";

const api = new ApiSchema(process.env.NEXT_PUBLIC_APP_BASE_URL || "");

export const homePageApi = {
  useGetHomePageResource: () =>
    api.useFetchRequest("HOME_PAGE_RESOURCE", "/api/landing"),
  useGetcarousel: () =>
    api.useFetchRequest("CAROUSEL_RESOURCE", "/api/carousel"),
};
