import { ReactElement } from "react"
import { StalePaginationStateFn } from "@/internal/product/state/stale-pagination"
import { ListProduct } from "@/components/ListProduct"

const StalePaginationProduct = (): ReactElement => {
  const paginationState = StalePaginationStateFn()

  return <ListProduct {...paginationState} title="Stale Pagination Product Page" />
}

export default StalePaginationProduct
