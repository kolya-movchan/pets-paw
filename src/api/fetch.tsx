import { Cat } from '../types/Api'
import { item } from './fetch-main'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export const getRandomCat = async (setRandomCat: Dispatch<Cat | undefined>) => {
  const randomCat = await item.get<Cat[]>('images/search');

  setRandomCat(randomCat[0])

  return randomCat || null
}
