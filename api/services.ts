'use client'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { useQuery, useMutation, UseMutationOptions ,keepPreviousData} from "@tanstack/react-query";

const APIBaseURL = process.env.NEXT_PUBLIC_APP_BASE_URL || "";

export default class ApiSchema {
  private instance: AxiosInstance;

  constructor(baseURL: string = APIBaseURL) {

    this.instance = axios.create({
      baseURL,
      timeout: 50000,
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
    return useQuery({
      queryKey: [key],
      queryFn: () => this.request<T>("get", url, undefined, config),
      placeholderData: keepPreviousData,
    });
  }

  useSendRequest<T>(
    method: "post" | "put" | "patch",
    url: string,
    config?: AxiosRequestConfig,
    option?: UseMutationOptions<any, any, any> 
  ) {
    return useMutation({
      mutationFn: (data: any) => this.request<T>(method, url, data, config),
      ...option,
    });
  }
}
