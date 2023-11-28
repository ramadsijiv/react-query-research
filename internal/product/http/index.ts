import { HTTPClient } from "@/internal/base/axios"
import { AxiosResponse } from "axios"
import { ListProductParamsType, ProductType } from "../type"

export const ListProduct = (params?: ListProductParamsType): Promise<AxiosResponse<ProductType[]>> => {
  return HTTPClient().get("/products", { params })
}

export const FindProduct = (id: number): Promise<AxiosResponse<ProductType>> => {
  return HTTPClient().get(`/products/${id}`)
}

export const UpdateProduct = (id: number, data: Partial<ProductType>): Promise<AxiosResponse<ProductType>> => {
  return HTTPClient().patch(`/products/${id}`, data)
}

export const CreateProduct = (data: Omit<ProductType, "id">): Promise<AxiosResponse<ProductType>> => {
  return HTTPClient().post(`/products`, data)
}

export const DeleteProduct = (id: number): Promise<AxiosResponse> => {
  return HTTPClient().delete(`/products/${id}`)
}
