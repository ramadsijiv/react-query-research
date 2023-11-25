import axios from "axios"

export const HTTPClient = () => {
  const client = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      Accept: "application/json",
    },
    timeout: 10000,
  })

  return client
}
