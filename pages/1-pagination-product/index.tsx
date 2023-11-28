import { ReactElement } from "react"
import { NormalPaginationStateFn } from "@/internal/product/state/normal-pagination"
import { PaginationProduct } from "@/components/PaginationProduct"
import { StalePaginationStateFn } from "@/internal/product/state/stale-pagination"
import { SwrPaginationStateFn } from "@/internal/product/state/swr-pagination"
import { MyQueryPaginationStateFn } from "@/internal/product/state/my-query-pagination"
import { UseQueryPaginationStateFn } from "@/internal/product/state/use-query-pagination"

const PaginationProductPage = (): ReactElement => {
  const paginationState = NormalPaginationStateFn()
  // const paginationState = StalePaginationStateFn()
  // const paginationState = SwrPaginationStateFn()
  // const paginationState = MyQueryPaginationStateFn()
  // const paginationState = UseQueryPaginationStateFn()

  return <PaginationProduct {...paginationState} />
}

export default PaginationProductPage
