import { ProductType } from "../type"
import { ListProduct, UpdateProduct, CreateProduct, DeleteProduct } from "../http"
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"

import { useFormik, FormikContextType } from "formik"
import * as yup from "yup"

type CreateUpdateProductStateFn = {
  query: UseMutationResult<ProductType, Error, Omit<ProductType, "id">>
  formik: FormikContextType<Omit<ProductType, "id">>
}

const validationSchema = yup.object({
  title: yup.string().min(3, "Title minimal 3 karakter").required("Title harus diisi"),
  description: yup.string().required("Description harus diisi"),
  price: yup.string().required("Price harus diisi"),
  brand: yup.string().required("Brand harus diisi"),
  category: yup.string().required("Category harus diisi"),
})

const initialValues = {
  title: "",
  description: "",
  price: 0,
  brand: "",
  category: "",
}

export const CreateUpdateProductStateFn = (id?: number): CreateUpdateProductStateFn => {
  const queryClient = useQueryClient()
  const mutationFn = async (data: Omit<ProductType, "id">) => {
    try {
      const productsResponse = id ? await UpdateProduct(id, data) : await CreateProduct(data)

      return productsResponse.data
    } catch (error) {
      throw error
    }
  }

  const { mutateAsync: createorUpdateProduct, ...rest } = useMutation({
    mutationFn,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["products-crud"] })
    },
  })

  const formik = useFormik<Omit<ProductType, "id">>({
    initialValues,
    validationSchema,
    onSubmit: (val, { resetForm }) => createorUpdateProduct(val).finally(() => resetForm()),
  })

  return { formik, query: { ...rest, mutateAsync: createorUpdateProduct } }
}

// ! delete
export const DeleteProductStateFn = () => {
  const queryClient = useQueryClient()

  const queryDelete = useMutation({
    mutationFn: DeleteProduct,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["products-crud"] })
    },
  })

  return queryDelete
}

// ! get product
const fetchDataProducts = async () => {
  try {
    const productsResponse = await ListProduct({ _start: 95, _limit: 50 })

    return productsResponse.data
  } catch (error) {
    throw error
  }
}

export const LastProductStateFn = (): UseQueryResult<ProductType[], Error> => {
  return useQuery({
    queryKey: ["products-crud"],
    queryFn: fetchDataProducts,
  })
}
