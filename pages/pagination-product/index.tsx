import { ReactElement } from "react"
import { NormalPaginationStateFn } from "@/internal/product/state/normal-pagination"
import { ListProduct } from "@/components/ListProduct"
import { StalePaginationStateFn } from "@/internal/product/state/stale-pagination"

const NormalPaginationProduct = (): ReactElement => {
  const paginationState = NormalPaginationStateFn()
  // const paginationState = StalePaginationStateFn()

  return <ListProduct {...paginationState} title="Normal Pagination Product Page" />
}

export default NormalPaginationProduct
