import { useState, useCallback, useEffect } from "react"
import { ProductType } from "../type"
import { ListProduct } from "../http"

export type PaginationStateType = {
  status: "idle" | "pending" | "success" | "error"
  data?: ProductType[]
  error?: Error | null
  refetch: () => void
  page: number
  setPage: (page: number) => void
}

// ! Normal
export const NormalPaginationStateFn = (): PaginationStateType => {
  const [data, setData] = useState<ProductType[]>()
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setStatus("pending")
    ListProduct({ _limit: 5, _page: page })
      .then(data => {
        setStatus("success")
        setData(data.data)
      })
      .catch(err => {
        setStatus("error")
        setError(err)
      })
  }, [page])

  const refetch = () => fetchData()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { status, data, error, refetch, page, setPage }
}
