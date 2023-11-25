export type ProductType = {
  id: number
  title: string
  description: string
  price: number
  brand: string
  category: string
}

export type ListProductParamsType = {
  _page?: number
  _limit?: number
}
