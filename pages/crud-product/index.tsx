import { ReactElement } from "react"
import {
  CreateUpdateProductStateFn,
  LastProductStateFn,
  DeleteProductStateFn,
} from "@/internal/product/state/cud-product"
import Link from "next/link"

const CrudProduct = (): ReactElement => {
  const { formik, query: queryMutation } = CreateUpdateProductStateFn()
  const { mutate: deleteProduct } = DeleteProductStateFn()
  const queryList = LastProductStateFn()

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="text-center">
        <form className="max-w-sm mx-auto mt-6 mb-6" onSubmit={formik.handleSubmit}>
          <label htmlFor="title-input" className="block mb-2 text-sm font-medium text-black">
            Title:
          </label>
          <input
            type="text"
            id="title-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-orange-950 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            name="title"
          />
          <label htmlFor="brand-input" className="block mt-6 mb-2 text-sm font-medium text-black">
            Brand:
          </label>
          <input
            type="text"
            id="brand-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-orange-950 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Brand"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
            name="brand"
          />
          <label htmlFor="category-input" className="block mt-6 mb-2 text-sm font-medium text-black">
            Category:
          </label>
          <input
            type="text"
            id="category-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-orange-950 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            name="category"
          />
          <label htmlFor="price-input" className="block mt-6 mb-2 text-sm font-medium text-black">
            Price:
          </label>
          <input
            type="number"
            id="price-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-orange-950 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Price (dollar)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            name="price"
          />
          <label htmlFor="description-input" className="block mt-6 mb-2 text-sm font-medium text-black">
            Description:
          </label>
          <textarea
            rows={4}
            cols={50}
            id="description-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-orange-950 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            name="description"
          />
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Product
            </button>
          </div>
        </form>
        {/* LIST */}
        <h1 className="text-4xl mt-6 font-bold text-orange-950">Last Product</h1>
        <div className="grid gap-6 mt-6">
          {queryList.isSuccess && (
            <>
              {queryList.data &&
                queryList.data.map((item, index) => (
                  <div key={index} className="flex items-center justify-center gap-x-6">
                    <Link href={`/product/${item.id}`} className="text-2xl leading-8 text-orange-950">
                      {item.title}
                    </Link>
                    <button
                      onClick={() => deleteProduct(item.id)}
                      type="button"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              {queryMutation.isPending && (
                <h1 className="text-2xl leading-8 text-orange-500">{queryMutation.variables.title}</h1>
              )}
            </>
          )}
        </div>
        {queryList.status === "error" && (
          <>
            <h1 className="text-4xl mt-6 font-bold text-orange-950">{queryList.error?.message}</h1>
            <button
              onClick={() => queryList.refetch()}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Refetch
            </button>
          </>
        )}
        {queryList.status === "pending" && <h1 className="text-4xl mt-6 font-bold text-orange-950">(Pending)</h1>}
        <div className="mt-10 mb-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go To Home Page
          </Link>
        </div>
        {/* LIST */}
      </div>
    </div>
  )
}

export default CrudProduct
