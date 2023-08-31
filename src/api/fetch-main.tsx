import { toast } from 'react-toastify'

const BASE_URL = 'https://api.thecatapi.com/v1/'
const userID = '890a8f581ddcffe2a0dee4227943b8a3'
const apiKey = import.meta.env.VITE_API_KEY

console.log('apiKey', apiKey);


function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

type FavImage = {
  image_id: string
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
type Data = null | FormData | FavImage

function isFormData(data: Data): data is FormData {
  return data instanceof FormData
}

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Data = null
): Promise<T> {
  const options: RequestInit = { method }

  isFormData(data)
    ? options.headers = {
        'x-api-key': `${apiKey}`
      }
    : options.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-api-key': `${apiKey}`
      }

  if (data) {
    if (isFormData(data)) {
      options.body = data
    } else {
      console.log('data', data);
      
      options.body = JSON.stringify({ ...data, sub_id: userID })
    }
  }

  console.log(BASE_URL + url, data, options.headers)

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
