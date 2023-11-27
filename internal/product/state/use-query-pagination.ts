import { useState } from "react"
import { ProductType } from "../type"
import { ListProduct } from "../http"
import { useQuery } from "@tanstack/react-query"

export type PaginationStateType = {
  status: "idle" | "pending" | "success" | "error"
  data?: ProductType[]
  error?: Error | null
  refetch: () => void
  page: number
  setPage: (page: number) => void
  isLoading: boolean
  isFetching: boolean
}

const fetchDataProducts = async (page: number) => {
  try {
    const productsResponse = await ListProduct({ _limit: 5, _page: page })
    return productsResponse.data
  } catch (error) {
    throw error
  }
}

export const UseQueryPaginationStateFn = (): PaginationStateType => {
  const [page, setPage] = useState<number>(1)

  const { status, data, error, refetch, isFetching, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchDataProducts(page),
    // select: data => data.title, // ! select returned data
    // enabled: false, // ! default true. if false, not automaticly fetching
    // refetchInterval: 1000, // ! default false. polling, refetch to update UI intervally (ms)
    // staleTime: 5000, // ! set expired / stale time
    // gcTime: 10000, // ! set garbage collection time (delete cache)
    // refetchOnWindowFocus: false, // ! default true. if false, not refetch when window focus. if 'always', wether the query stale / fresh, its still trigger refetching
    // refetchOnMount: true // ! default true. if false, not refetch when component mount. if 'always', wether the query stale / fresh, its still trigger refetching
  })

  return { status, data, error, refetch, page, setPage, isFetching, isLoading }
}
