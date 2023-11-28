import Link from "next/link"
import { ReactElement } from "react"
import { ProductType } from "@/internal/product/type"

type ProductDetailPropsType = {
  id: string
  isLoading: boolean
  status: "idle" | "pending" | "success" | "error"
  data?: ProductType
  error?: Error | null
  refetch: () => void
}

export const DetailProduct = ({
  id,
  data,
  isLoading,
  status,
  error,
  refetch,
}: ProductDetailPropsType): ReactElement => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-4xl mt-6 font-bold text-gray-300">Detail Product With ID: {id} </h1>
      {isLoading && <h1 className="text-4xl mt-6 font-bold text-gray-300">Loading....</h1>}
      {status === "error" && (
        <>
          <h1 className="text-4xl mt-6 font-bold text-gray-300">{error?.message}</h1>
          <button
            onClick={refetch}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Refetch
          </button>
        </>
      )}
      {data && (
        <>
          <p className="mt-3 text-lg leading-8 text-gray-300">{data.title}</p>
          <p className="mt-3 text-lg leading-8 text-gray-300">Brand: {data.brand}</p>
          <p className="mt-3 text-lg leading-8 text-gray-300">Category: {data.category}</p>
          <p className="mt-3 text-lg leading-8 text-gray-300">Price: {data.price}</p>
          <p className="mt-3 text-lg leading-8 text-gray-300">{data.description}</p>
        </>
      )}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Home Page
        </Link>
        <Link
          href="/all-product"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          All Product Page
        </Link>
        <Link
          href="/crud-product"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          CRUD Product Page
        </Link>
      </div>
    </div>
  </div>
)
