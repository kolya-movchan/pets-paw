import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { CatImage } from '../../components/CatImage/CatImage'
import { DescriptionInfo } from '../../components/DescriptionInfo/DescriptionInfo'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { Breed, BreedList, BreedsImage } from '../../types/Api'
import {
  getAllBreedsData,
  getBreedsByType,
  getBreedsInfo
} from '../../utils/breeds-controller'

export const BreedsInfo = () => {
  const { slug } = useParams()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [allBreeds, setAllBreeds] = useState<BreedList[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('')
  const [breedsByType, setBreedsByType] = useState<BreedsImage[]>([])
  const [breedInfo, setBreedInfo] = useState<Breed | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const selectPhotoByPick = (index: number) => {
    setCurrentPhotoIndex(index)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const limit = searchParams.get('limit') || ''

    if (slug && limit) {
      getBreedsByType(slug, limit, setBreedsByType, setIsLoading)
      getBreedsInfo(slug, setBreedInfo)
    }

    getAllBreedsData(setAllBreeds, setIsLoading)
  }, [])

  return (
    <div className="side-container-menu">
      <div className="top-nav">
        <TopNavBar />
      </div>
      <div className="voting side-inner-container loader-parent">
        <div className="breeds-navbar-container">
          <LabelNav label={'breeds'} />
          <div className="breed-id-label title">{slug}</div>
        </div>

        {isLoading && (
          <div className="loader">
            <ReactLoading
              type={'spin'}
              color={'#FF868E'}
              height={50}
              width={50}
              delay={0}
            />
          </div>
        )}

        {breedsByType && breedsByType.length > 1 && (
          <>
            <div className="voting-hero-container loader-parent">
              <div className="voting-hero breed-parent">
                <CatImage
                  src={breedsByType[currentPhotoIndex].url as string}
                  placeholderSrc={'./home-page/plc.png'}
                  style={{ borderRadius: '20px' }}
                  className="hero-img"
                />
              </div>

              <div className="slider">
                {breedsByType.map((breed, index) => {
                  return (
                    <button
                      key={breed.id}
                      id={index.toString()}
                      className={classNames('slider-picker', {
                        'slider-picker--active': index === currentPhotoIndex
                      })}
                      onClick={() => selectPhotoByPick(index)}
                    ></button>
                  )
                })}
              </div>
            </div>

            {breedInfo && breedInfo.id ? (
              <div className="breed-info-card">
                <div className="breed-top-container">
                  <h2 className="breed-info-card__name title">
                    {breedInfo.name}
                  </h2>

                  <h3 className="breed-info-card__description title">
                    {breedInfo.description}
                  </h3>
                </div>

                <div className="description-container">
                  <div className="description-1stcl">
                    <DescriptionInfo
                      title="Temperament"
                      data={breedInfo.temperament}
                    />
                  </div>

                  <div className="description-2ndcl">
                    <DescriptionInfo title="Origin" data={breedInfo.origin} />
                    <DescriptionInfo
                      title="Weight"
                      data={`${breedInfo.weight.metric} kg`}
                    />
                    <DescriptionInfo
                      title="Life span"
                      data={`${breedInfo.life_span} years`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <NotFound />
            )}
          </>
        )}
      </div>
    </div>
  )
}
