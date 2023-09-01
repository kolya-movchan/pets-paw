import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { Cat } from '../../types/Api'
import {
  addCatToFav,
  addToDislikes,
  addToLikes
} from '../../utils/impression-controller'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

type Props = {
  setRandomCat: Dispatch<Cat | undefined>
  randomCat: Cat
  selectedBreed: string,
}

export const ImpressionController: React.FC<Props> = ({
  setRandomCat,
  randomCat,
  selectedBreed,
}) => {
  const dispatch = useAppDispatch()
  const [lastClickTime, setLastClickTime] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (isDisabled) {
      const timer = setTimeout(() => {
        setIsDisabled(false)
      }, 1300) 
      return () => clearTimeout(timer)
    }
  }, [isDisabled])

  const handleClick = (action: Function) => {
    if (!isDisabled) {
      setIsDisabled(true)
      setLastClickTime(Date.now())
      action()
    }
  }
  

  return (
    <div className='impression-controller'>
      <div className='impression'>
        <button
          onClick={() =>
            handleClick(() => addToLikes(setRandomCat, randomCat, dispatch, selectedBreed))
          }
          className={classNames(
            "impression-mode impression-mode--like",
            {'impression-mode--disabled': isDisabled}
          )}
          disabled={isDisabled}
        ></button>
      </div>
      <div className="impression">
        <button
         className={classNames(
          "impression-mode impression-mode--fav",
          {'impression-mode--disabled': isDisabled}
        )}
          onClick={() =>
            handleClick(() => addCatToFav(setRandomCat, randomCat.id, dispatch, selectedBreed))
          }
          disabled={isDisabled}
        ></button>
      </div>
      <div className="impression">
        <button
         className={classNames(
          "impression-mode impression-mode--dislike",
          {'impression-mode--disabled': isDisabled}
        )}
          onClick={() =>
            handleClick(() => addToDislikes(setRandomCat, randomCat, dispatch, selectedBreed))
          }
          disabled={isDisabled}
        ></button>
      </div>
    </div>
  )
}
