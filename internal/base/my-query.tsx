import {
  useEffect,
  useReducer,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  Reducer,
} from "react"

type CacheDataMyQueryType = Record<string, any>

type MyQueryContextType = {
  setCurrentKey: Dispatch<SetStateAction<string | undefined>>
  currentKey?: string
  cacheData: CacheDataMyQueryType
  setCacheData: Dispatch<SetStateAction<CacheDataMyQueryType>>
}

type MyQueryProviderPropsType = {
  children: ReactNode
}

type UseMyQueryPropsType<DataType> = {
  queryKey: (number | string)[]
  queryFn: () => Promise<DataType>
}

type UseMyQueryStateType<DataType> = {
  status: "idle" | "pending" | "success" | "error"
  data?: DataType
  error?: Error | null
}

type MyQueryReducerActionType<DataType> = {
  type: "FETCH" | "REFETCH" | "FETCH_SUCCESS" | "FETCH_ERROR"
  payload?: Partial<UseMyQueryStateType<DataType>>
}

type MyQueryReducerOnChangeType<DataType> = {
  state: UseMyQueryStateType<DataType>
  send: Dispatch<MyQueryReducerActionType<DataType>>
  key: string
  queryFn: () => Promise<DataType>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setIsFetching: Dispatch<SetStateAction<boolean>>
} & Pick<MyQueryContextType, "cacheData" | "setCacheData">

// ! set context
const MyQueryContext = createContext<MyQueryContextType>({
  cacheData: {},
  setCacheData: data => data,
  currentKey: undefined,
  setCurrentKey: data => data,
})

const useMyQueryContext = () => useContext(MyQueryContext)

// ! set provider
export const MyQueryProvider = ({ children }: MyQueryProviderPropsType) => {
  const [cacheData, setCacheData] = useState<CacheDataMyQueryType>({})
  const [currentKey, setCurrentKey] = useState<string>()

  return (
    <MyQueryContext.Provider value={{ cacheData, setCacheData, currentKey, setCurrentKey }}>
      {children}
    </MyQueryContext.Provider>
  )
}

// ! set hooks useMyQuery
const myQueryReducer = <DataType,>(
  prevState: UseMyQueryStateType<DataType>,
  action: MyQueryReducerActionType<DataType>
): UseMyQueryStateType<DataType> => {
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
        case "REFETCH":
          return { ...prevState, status: "pending", error: undefined, data: undefined }
        // ! after revalidate success, set data from payload
        case "FETCH_SUCCESS":
          return { ...prevState, status: "success", data: action.payload?.data }
        default:
          return prevState
      }
    case "error":
      switch (action.type) {
        case "REFETCH":
          return { ...prevState, status: "pending", error: undefined, data: undefined }
        default:
          return prevState
      }
    default:
      return prevState
  }
}

const onStateChange = <DataType,>({
  state,
  key,
  cacheData,
  setCacheData,
  send,
  setIsLoading,
  setIsFetching,
  queryFn,
}: MyQueryReducerOnChangeType<DataType>): void => {
  switch (state.status) {
    case "idle":
      send({ type: "FETCH" })
      break
    case "pending":
      // ! give stale data
      if (cacheData[key]) {
        send({ type: "FETCH_SUCCESS", payload: { data: cacheData[key] } })
      } else {
        setIsLoading(true)
      }
      // ! revalidate data from API
      setIsFetching(true)
      queryFn()
        .then(data => {
          setCacheData(value => ({ ...value, [key]: data }))
          send({ type: "FETCH_SUCCESS", payload: { data } })
        })
        .catch(error => {
          send({ type: "FETCH_ERROR", payload: { error } })
        })
        .finally(() => {
          setIsLoading(false)
          setIsFetching(false)
        })
      break
    default:
      break
  }
}

export const useMyQuery = <DataType,>({
  queryKey,
  queryFn,
}: UseMyQueryPropsType<DataType>): UseMyQueryStateType<DataType> & {
  isLoading: boolean
  isFetching: boolean
  refetch: () => void
} => {
  const { cacheData, setCacheData, currentKey, setCurrentKey } = useMyQueryContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const key = queryKey.join("-")

  const [state, send] = useReducer<Reducer<UseMyQueryStateType<DataType>, MyQueryReducerActionType<DataType>>>(
    myQueryReducer,
    {
      status: "idle",
      data: undefined,
      error: undefined,
    }
  )

  const refetch = () => {
    send({ type: "REFETCH" })
  }

  useEffect(() => {
    if (!currentKey) {
      setCurrentKey(key)
    } else if (currentKey !== key) {
      setCurrentKey(key)
      refetch()
    }
  }, [key, currentKey])

  useEffect(() => {
    onStateChange({
      state,
      send,
      key,
      setCacheData,
      cacheData,
      setIsLoading,
      setIsFetching,
      queryFn,
    })
  }, [state, send, key, queryFn, cacheData])

  return { ...state, isLoading, isFetching, refetch }
}
