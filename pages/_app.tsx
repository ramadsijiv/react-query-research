import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MyQueryProvider } from "@/internal/base/my-query"

const queryClient = new QueryClient()

//  ! set default option globally
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//       gcTime: Infinity
//     },
//     mutations: {
//       staleTime: Infinity,
//       gcTime: Infinity
//     }
//   }
// })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MyQueryProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </MyQueryProvider>
    </QueryClientProvider>
  )
}
