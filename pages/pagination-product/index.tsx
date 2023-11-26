import { ReactElement } from "react"
import { NormalPaginationStateFn } from "@/internal/product/state/normal-pagination"
import { ListProduct } from "@/components/ListProduct"
import { StalePaginationStateFn } from "@/internal/product/state/stale-pagination"
import { SwrPaginationStateFn } from "@/internal/product/state/swr-pagination"

const NormalPaginationProduct = (): ReactElement => {
  // const paginationState = NormalPaginationStateFn()
  // const paginationState = StalePaginationStateFn()
  const paginationState = SwrPaginationStateFn()

  return <ListProduct {...paginationState} title="Normal Pagination Product Page" />
}

export default NormalPaginationProduct
