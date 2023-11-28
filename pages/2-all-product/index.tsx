import { ReactElement } from "react"
import { AllProducts } from "@/components/AllProducts"
import { UseQueryAllProductStateFn, MyQueryAllProductStateFn } from "@/internal/product/state/all-product"

const AllProduct = (): ReactElement => {
  const productState = MyQueryAllProductStateFn()
  // const productState = UseQueryAllProductStateFn()

  return <AllProducts {...productState} />
}

export default AllProduct
