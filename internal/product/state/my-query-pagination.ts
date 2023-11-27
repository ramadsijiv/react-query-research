import { useState } from "react"
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

export const MyQueryPaginationStateFn = (): PaginationStateType => {
  const [page, setPage] = useState<number>(1)

  const { status, data, error, refetch, isFetching, isLoading } = useMyQuery({
    queryKey: ["products", page],
    queryFn: () => fetchDataProducts(page),
  })

  return { status, data, error, refetch, page, setPage, isFetching, isLoading }
}

/*
! solved by hooks useMyQuery
a. data cache di simpan di global state (mengatasi refetch saat berpindah halaman)
b. fetch lebih mudah, tinggal kasih queryKey sama querFn aja, state di handle sama hooks

! unsolved
still need improvement if we need more advance fetching / caching method
ex:
a. advanced cache (set stale time / set time to remove cache)
b. refetch intervally
c. set initial data of cache
*/
