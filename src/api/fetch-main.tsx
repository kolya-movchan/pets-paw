import { toast } from 'react-toastify'

const BASE_URL = 'https://api.thecatapi.com/v1/'
const userID = '890a8f581ddcffe2a0dee4227943b8a3'
const apiKey = import.meta.env.VITE_API_KEY

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
type Data = null | {}

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Data = null
): Promise<T> {
  const options: RequestInit = { method }

  options.headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'x-api-key': `${apiKey}`
  }

  // console.log(url);

  if (data) {
    options.body = JSON.stringify({ ...data, sub_id: userID })
  }

  return wait(0)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        toast.error('Something went wrong')

        throw new Error()
      }

      return response.json()
    })
}

export const item = {
  get: function <T>(url: string) {
    return request<T>(url)
  },
  post: function <T>(url: string, data: Data) {
    return request<T>(url, 'POST', data)
  },
  delete: (url: string) => request(url, 'DELETE')
}
