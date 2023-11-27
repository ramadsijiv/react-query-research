import { ReactElement } from "react"
import { DetailProduct } from "@/components/DetailProduct"
import { UseQueryDetailProductStateFn, MyQueryDetailProductStateFn } from "@/internal/product/state/detail-product"
import { useRouter } from "next/router"

const ProductDetailPage = (): ReactElement => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ""

  const useQueryProps = MyQueryDetailProductStateFn(+id)
  // const useQueryProps = UseQueryDetailProductStateFn(+id)

  if (!id || id === "") return <></>

  return <DetailProduct id={id} {...useQueryProps} />
}

export default ProductDetailPage
