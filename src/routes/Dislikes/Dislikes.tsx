import React, { useEffect, useState } from 'react'
import { v4 as uuidv } from 'uuid'
import { CatImage } from '../../components/CatImage/CatImage'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { Cat } from '../../types/Api'

export const Dislikes = () => {
  const [dislikedCatsFromStorage, setDislikedCatsFromStorage] = useState<Cat[]>(
    []
  )

  useEffect(() => {
    let storedLikes: Cat[] = JSON.parse(
      localStorage.getItem('dislikes') || '[]'
    )

    if (storedLikes) {
      setDislikedCatsFromStorage(storedLikes)
    }
  }, [])

  return (
    <div className="side-container-menu">
      <div className="top-nav">
        <TopNavBar />
      </div>
      <div className="voting side-inner-container">
        <LabelNav label="dislikes" />

        {dislikedCatsFromStorage.length > 1 ? (
          <div className="grid">
            {dislikedCatsFromStorage?.map((cat, index) => {
              return (
                <div key={uuidv()} className={`cat${index + 1} cat`}>
                  <CatImage
                    src={cat.url}
                    placeholderSrc={'./home-page/plc.png'}
                  />
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
