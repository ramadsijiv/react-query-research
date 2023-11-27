import { useState, Dispatch, SetStateAction, useCallback, useEffect, useReducer } from "react"
import { ProductType } from "../type"
import { ListProduct } from "../http"
import { PaginationStateType } from "./normal-pagination"

type DataType = {
  data?: ProductType[]
  error?: Error | null
  status: "idle" | "pending" | "success" | "error"
  page: number
}

type ActionType = {
  type: "FETCH" | "REFETCH" | "FETCH_SUCCESS" | "FETCH_ERROR" | "CHANGE_PAGE"
  payload?: Partial<DataType>
}

type OnChangeStateType = {
  state: DataType
  send: Dispatch<ActionType>
  key: string
  cache: Record<string, ProductType[]>
  setCache: Dispatch<SetStateAction<Record<string, ProductType[]>>>
}

const reducer = (prevState: DataType, action: ActionType): DataType => {
  switch (prevState.status) {
    case "idle":
      switch (action.type) {
        case "FETCH":
          return { ...prevState, status: "pending" }
        default:
          return prevState
      }
    case "pending":
      switch (action.type) {
        case "FETCH_SUCCESS":
          return { ...prevState, status: "success", data: action.payload?.data }
        case "FETCH_ERROR":
          return { ...prevState, status: "error", error: action.payload?.error }
        default:
          return prevState
      }
    case "success":
      switch (action.type) {
        case "CHANGE_PAGE":
          return { ...prevState, status: "pending", page: action.payload?.page ?? prevState.page }
        // ! after revalidate success, set data from payload
        case "FETCH_SUCCESS":
          return { ...prevState, status: "success", data: action.payload?.data }
        default:
          return prevState
      }
    case "error":
      switch (action.type) {
        case "CHANGE_PAGE":
          return { ...prevState, status: "pending", page: action.payload?.page ?? prevState.page }
        case "REFETCH":
          return { ...prevState, status: "pending", error: undefined }
        default:
          return prevState
      }
    default:
      return prevState
  }
}

const onStateChange = ({ state, send, key, cache, setCache }: OnChangeStateType): void => {
  switch (state.status) {
    case "idle":
      send({ type: "FETCH" })
      break
    case "pending":
      // ! give stale data
      if (cache[key]) {
        send({ type: "FETCH_SUCCESS", payload: { data: cache[key] } })
      }
      // ! revalidate data from API
      ListProduct({ _limit: 5, _page: state.page })
        .then(({ data }) => {
          setCache(value => ({ ...value, [key]: data }))
          send({ type: "FETCH_SUCCESS", payload: { data } })
        })
        .catch(error => {
          send({ type: "FETCH_ERROR", payload: { error } })
        })
      break
    default:
      break
  }
}

export const SwrPaginationStateFn = (): PaginationStateType => {
  const [cache, setCache] = useState<Record<string, ProductType[]>>({})
  const [state, send] = useReducer(reducer, {
    status: "idle",
    data: undefined,
    error: undefined,
    page: 1,
  })

  const key = `products-${state.page}`
  const setPage = (page: number) => send({ type: "CHANGE_PAGE", payload: { page } })
  const refetch = () => send({ type: "REFETCH" })

  useEffect(() => {
    onStateChange({ state, send, key, setCache, cache })
  }, [state, send, key, setCache, cache])

  return { ...state, refetch, setPage }
}

/*
! solved
1. penerapan SWR, mengurangi waktu loading (dari segi UI) + revalidasi data

! unsolved
1. load ulang jika ganti halaman, contoh ke home terus balik lagi
2. SWR hanya berlaku buat product page yg ada pagination saja. 
   kalo ada page buat product detail dll harus buat lagi reducer dll nya.
*/
