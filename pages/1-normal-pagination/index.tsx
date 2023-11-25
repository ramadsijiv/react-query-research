import { ReactElement } from "react"
import { NormalPaginationStateFn } from "@/internal/product/state/normal-pagination"
import { ListProduct } from "@/components/ListProduct"

const NormalPaginationProduct = (): ReactElement => {
  const paginationState = NormalPaginationStateFn()

  return <ListProduct {...paginationState} title="Normal Pagination Product Page" />
}

export default NormalPaginationProduct
