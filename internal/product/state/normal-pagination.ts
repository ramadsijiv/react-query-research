import { useState, Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { ProductType } from "../type"
import { ListProduct } from "../http"

export type PaginationStateType = {
  status: "pending" | "success" | "error"
  data?: ProductType[]
  error?: Error | null
  refetch: () => void
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isFetching: boolean
}

// ! Normal
export const NormalPaginationStateFn = (): PaginationStateType => {
  const [data, setData] = useState<ProductType[]>()
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending")
  const [page, setPage] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setIsFetching(true)
    ListProduct({ _limit: 5, _page: page })
      .then(data => {
        setStatus("success")
        setData(data.data)
      })
      .catch(err => {
        setStatus("error")
        setError(err)
      })
      .finally(() => setIsFetching(false))
  }, [page])

  const refetch = () => fetchData()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { status, data, error, refetch, page, setPage, isFetching }
}

/*
1. Loading setiap request
2. State management kompleks (banyak useState)
*/
