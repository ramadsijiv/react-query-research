import { ProductType } from "../type"
import { ListProduct } from "../http"
import { useQuery } from "@tanstack/react-query"
import { useMyQuery } from "@/internal/base/my-query"

export type AllProductStateType = {
  status: "idle" | "pending" | "success" | "error"
  data?: ProductType[]
  error?: Error | null
  refetch: () => void
}

const fetchDataProducts = async () => {
  try {
    const productsResponse = await ListProduct()
    return productsResponse.data
  } catch (error) {
    throw error
  }
}

export const UseQueryAllProductStateFn = (): AllProductStateType => {
  const { status, data, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchDataProducts,
  })

  return { status, data, error, refetch }
}

export const MyQueryAllProductStateFn = (): AllProductStateType => {
  const { status, data, error, refetch } = useMyQuery({
    queryKey: ["products"],
    queryFn: fetchDataProducts,
  })

  return { status, data, error, refetch }
}
