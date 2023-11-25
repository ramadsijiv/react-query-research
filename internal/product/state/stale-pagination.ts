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

type DataSetterParamsType = {
  queryKey: string
  value: any
}

// ! Stale
export const StalePaginationStateFn = (): PaginationStateType => {
  const [clientData, setClientData] = useState<Record<string, any>>({})
  const [data, setData] = useState<ProductType[]>()
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending")
  const [page, setPage] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    if (clientData?.[`page-${page}`]) {
      console.log("ada data di cache state")
      setData(clientData[`page-${page}`])
    } else {
      setIsFetching(true)
      ListProduct({ _limit: 5, _page: page })
        .then(data => {
          setClientData({ queryKey: `page-${page}`, value: data.data })
          setStatus("success")
          setData(data.data)
        })
        .catch(err => {
          setStatus("error")
          setError(err)
        })
        .finally(() => setIsFetching(false))
    }
  }, [page])

  const refetch = () => fetchData()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { status, data, error, refetch, page, setPage, isFetching }
}

/*
1. Loading hanya di request baru, tapi data lama udah stale
2. State management kompleks (banyak useState)
*/
