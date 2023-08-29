import { SetURLSearchParams } from 'react-router-dom'

interface CurrentParams {
  page: string
  limit: string
  order: string
  breeds: string
  type: string
}

export const handleSearchParams = (
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams,
  data?: string[]
): CurrentParams => {
  if (data) {
    searchParams.set(data[0], data[1])
  } else {
    searchParams.set('limit', '5')
  }

  const currentPage = Number(searchParams.get('page'))

  if (data && data[0] !== 'page' && currentPage > 0) {
    searchParams.set('page', '0')
  }

  setSearchParams(searchParams)

  return {
    page: searchParams.get('page') || '',
    limit: searchParams.get('limit') || '',
    order: searchParams.get('order') || '',
    breeds: searchParams.get('breeds') || '',
    type: searchParams.get('type') || ''
  }
}
