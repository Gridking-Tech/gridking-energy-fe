import ApiSchema from "./apiSchema";

const api = new ApiSchema("");

const userApi = {
  useGetUsers: () => api.useFetchRequest("users", "/users"),
  useCreateUser: () => api.useSendRequest("post", "/users"),
};

export default userApi;
