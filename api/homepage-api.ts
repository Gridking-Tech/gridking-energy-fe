import ApiSchema from "./services";

const api = new ApiSchema(process.env.NEXT_PUBLIC_APP_BASE_URL || "");

export const homePageApi = {
  useGetHomePageResource: () =>
    api.useFetchRequest("HOME_PAGE_RESOURCE", "/landing"),
  useGetcarousel: () =>
    api.useFetchRequest("CAROUSEL_RESOURCE", "/carousel"),
  useGetCarouselById: (id: string) =>
    api.useFetchRequest("CAROUSEL_SINGLE_RESOURCE", `/image/Carousel/${id}`),
};