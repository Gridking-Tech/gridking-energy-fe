import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

import { useQuery, useMutation } from "react-query";

const APIBaseURL = process.env.NEXT_PUBLIC_APP_BASE_URL || "";

export default class ApiSchema {
  private instance: AxiosInstance;

  constructor(baseURL: string = APIBaseURL) {

    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async request<T>(
    method: "get" | "post" | "put" | "patch",
    url: string,
    data?: string[],
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance[method](
      url,
      data,
      config
    );
    return response.data;
  }

  useFetchRequest<T>(key: string, url: string, config?: AxiosRequestConfig) {
    return useQuery(key, () => this.request<T>("get", url, undefined, config), {
      keepPreviousData: true,
    });
  }

  useSendRequest<T>(
    method: "post" | "put" | "patch",
    url: string,
    config?: AxiosRequestConfig
  ) {
    return useMutation((data: any) =>
      this.request<T>(method, url, data, config)
    );
  }
}
