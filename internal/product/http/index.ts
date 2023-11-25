import { HTTPClient } from "@/internal/base/axios"
import { AxiosResponse } from "axios"
import { ListProductParamsType, ProductType } from "../type"

export const ListProduct = (params?: ListProductParamsType): Promise<AxiosResponse<ProductType[]>> => {
  return HTTPClient().get("/products", { params })
}

export const FindProduct = (id: number): Promise<AxiosResponse<ProductType>> => {
  return HTTPClient().get(`/products/${id}`)
}
