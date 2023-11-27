import Link from "next/link"
import { ReactElement } from "react"
import { ProductType } from "@/internal/product/type"

type AllProductsPropsType = {
  status: "idle" | "pending" | "success" | "error"
  data?: ProductType[]
  error?: Error | null
  refetch: () => void
}

export const AllProducts = ({ status, data, error, refetch }: AllProductsPropsType): ReactElement => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl mt-6 font-bold text-gray-300">All Product Page</h1>
      <div className="grid gap-6 mt-6">
        {status === "success" &&
          data &&
          data.map((item, index) => (
            <p key={index} className="text-2xl leading-8 text-gray-300">
              {item.title}
            </p>
          ))}
      </div>
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
      {status === "pending" && <h1 className="text-4xl mt-6 font-bold text-gray-300">(Pending)</h1>}
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go To Home Page
        </Link>
      </div>
    </div>
  </div>
)
