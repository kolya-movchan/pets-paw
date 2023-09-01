import React, { useEffect, useState } from 'react'
import { v4 as uuidv } from 'uuid'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import '../../styles/grid.scss'
import { Cat } from '../../types/Api'


export const Likes = () => {
  const [likedCatsFromStorage, setLikedCatsFromStorage] = useState<Cat[]>([])

  useEffect(() => {
    let storedLikes: Cat[] = JSON.parse(localStorage.getItem('likes') || '[]')

    if (storedLikes) {
      setLikedCatsFromStorage(storedLikes)
    }
  }, [])

  return (
    <div className="side-container-menu">
     <div className="top-nav">
        <TopNavBar />
      </div>
      <div className="side-wrapper side-inner-container">
        <LabelNav label="likes" />

        {likedCatsFromStorage.length > 1 ? (
          <div className="grid">
            {likedCatsFromStorage?.map((cat, index) => {
              return (
                <div key={uuidv()} className={`cat${index + 1} cat`}>
                  <img src={cat.url} alt="cat-image" />
                </div>
              )
            })}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  )
}
