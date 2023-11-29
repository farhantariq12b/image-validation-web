import axios from "axios"
import { _getAppConfig } from "nuxt/app"

const config = _getAppConfig()

export const BASE_API_URL = config.public?.NUXT_BACKEND_API_URL

const Service = (url: string) =>
  axios.create({
    baseURL: BASE_API_URL + url
  })

export const AuthorizedService = (url: string) => {
  const authorizedService = Service(url)
  return authorizedService
}
