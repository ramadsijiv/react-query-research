import Link from "next/link"
import { ReactElement } from "react"
import { PaginationStateType } from "@/internal/product/state/normal-pagination"

type ListProductPropsType = {
  title: string
} & PaginationStateType

export const ListProduct = ({
  title,
  status,
  data,
  error,
  refetch,
  page,
  setPage,
  isFetching,
}: ListProductPropsType): ReactElement => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl mt-6 font-bold text-gray-300">{title}</h1>
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
      {isFetching && <h1 className="text-4xl mt-6 font-bold text-gray-300">Loading....</h1>}
      <div className="grid gap-6 mt-6">
        {data &&
          !isFetching &&
          data.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <p className="text-4xl leading-8 text-gray-300">{item.title}</p>
                <p className="text-sm leading-8 text-gray-300">Brand: {item.brand}</p>
                <p className="text-sm leading-8 text-gray-300">Category: {item.category}</p>
                <p className="text-sm leading-8 text-gray-300">Price: {item.price}</p>
                <p className="text-sm leading-8 text-gray-300">{item.description}</p>
              </div>
            )
          })}
      </div>
      {data && (
        <>
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm mt-6">
              <li>
                <a
                  onClick={() => page > 1 && setPage(value => value - 1)}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {page}
                </a>
              </li>
              <li>
                <a
                  onClick={() => setPage(value => value + 1)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
      {(status === "pending" || !data) && (
        <h1 className="text-4xl mt-6 font-bold text-gray-300">Gaada Data (Pending).</h1>
      )}
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
