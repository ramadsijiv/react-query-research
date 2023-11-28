import { ProductType } from "../type"
import { FindProduct } from "../http"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMyQuery } from "@/internal/base/my-query"

export type AllProductStateType = {
  status: "idle" | "pending" | "success" | "error"
  data?: ProductType
  error?: Error | null
  refetch: () => void
  isLoading: boolean
  isFetching: boolean
}

const fetchDataProduct = async (id: number) => {
  try {
    const productsResponse = await FindProduct(id)
    return productsResponse.data
  } catch (error) {
    throw error
  }
}

export const UseQueryDetailProductStateFn = (id: number): AllProductStateType => {
  const queryClient = useQueryClient()

  const { status, data, error, refetch, isFetching, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchDataProduct(id),
    // initialData: () => {
    //   const products: ProductType[] | undefined = queryClient.getQueryData(["products"])
    //   const productId = products?.find(item => item.id === id)
    //   return productId
    // },
  })

  return { status, data, error, refetch, isFetching, isLoading }
}

export const MyQueryDetailProductStateFn = (id: number): AllProductStateType => {
  const { status, data, error, refetch, isFetching, isLoading } = useMyQuery({
    queryKey: ["product", id],
    queryFn: () => fetchDataProduct(id),
  })

  return { status, data, error, refetch, isFetching, isLoading }
}
