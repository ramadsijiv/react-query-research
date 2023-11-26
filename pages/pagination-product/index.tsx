import { ReactElement } from "react"
import { NormalPaginationStateFn } from "@/internal/product/state/normal-pagination"
import { ListProduct } from "@/components/ListProduct"
import { StalePaginationStateFn } from "@/internal/product/state/stale-pagination"
import { SwrPaginationStateFn } from "@/internal/product/state/swr-pagination"
import { MyQueryPaginationStateFn } from "@/internal/product/state/my-query-pagination"

const PaginationProduct = (): ReactElement => {
  const paginationState = NormalPaginationStateFn()
  // const paginationState = StalePaginationStateFn()
  // const paginationState = SwrPaginationStateFn()
  // const paginationState = MyQueryPaginationStateFn()

  return <ListProduct {...paginationState} title="Normal Pagination Product Page" />
}

export default PaginationProduct
