import { useState, useCallback, useEffect } from "react"
import { ProductType } from "../type"
import { ListProduct } from "../http"
import { useMyQuery } from "@/internal/base/my-query"

export type PaginationStateType = {
  status: "idle" | "pending" | "success" | "error"
  data?: ProductType[]
  error?: Error | null
  refetch: () => void
  page: number
  setPage: (page: number) => void
}

const fetchDataProducts = async (page: number) => {
  try {
    const productsResponse = await ListProduct({ _limit: 5, _page: page })
    return productsResponse.data
  } catch (error) {
    throw error
  }
}

export const MyQueryPaginationStateFn = (): PaginationStateType => {
  const [page, setPage] = useState<number>(1)

  const { status, data, error, refetch } = useMyQuery({
    queryKey: ["products", page],
    queryFn: () => fetchDataProducts(page),
  })

  return { status, data, error, refetch, page, setPage }
}

/*
1. Loading setiap request
2. State management kompleks sehingga sulit dibaca (banyak useState / useEffect)
*/
