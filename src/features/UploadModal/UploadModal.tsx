import { blue } from '@mui/material/colors'
import React, { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'
import { uploadCat } from '../../api/fetch'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'

type Props = {
  onClose: (status: boolean) => void
  isOpen: boolean
}

const apiKey = import.meta.env.VITE_API_KEY

interface Upload {
  sent: boolean
  success: boolean
}

export const UploadModal: React.FC<Props> = ({ onClose, isOpen }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isCatUploaded, setIsCatUploaded] = useState<Upload>({
    sent: false,
    success: false
  })

  const handleChoosenImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0])
    }

    setIsCatUploaded({ sent: false, success: false })
  }

  const handleImgSubmit = async () => {
    if (selectedImage) {
      setIsCatUploaded({ sent: true, success: false })
      try {
        const response = await uploadCat(selectedImage)
        // console.log('Image uploaded successfully:', response)

        setIsCatUploaded({ sent: true, success: true })

        toast.success('Image uploaded successfully!')
      } catch (error) {
        setIsCatUploaded({ sent: true, success: false })
      }
    }

    setSelectedImage(null)
  }

  // useEffect(() => {
  //   document.body.style.overflow = 'hidden'

  //   return () => {
  //     document.body.style.overflow = 'auto'
  //   }
  // }, [])

  return (
    // <div className="body-overlay">
      <>
        <button
          className="upload__btn-close"
          onClick={() => onClose(false)}
        ></button>

        <h2 className="upload__title title">Upload a .jpg or .png Cat Image</h2>

        <p className="upload__p">
          Any uploads must comply with the{' '}
          <a
            href="https://thecatapi.com/privacy"
            target="_blank"
            className="upload__link"
          >
            upload guidelines
          </a>{' '}
          or face deletion.
        </p>

        <label className="upload__custom-label">
          {!selectedImage && (
            <div className="upload__info">
              <span className="title">Drag here</span> your file or
              <span className="title"> Click her</span> to upload
            </div>
          )}

          <input
            type="file"
            className="upload__input"
            accept=".jpg,.png"
            onChange={handleChoosenImg}
          />

          {selectedImage && (
            <div className="upload__preview">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="cat image from device"
                className="hero-img"
              />
            </div>
          )}
        </label>

        <p className="upload__status">
          {selectedImage
            ? `Image File Name: ${selectedImage.name}`
            : 'No file selected'}
        </p>

        {selectedImage && (
          <button
            className="upload__confirm title"
            onClick={() => handleImgSubmit()}
          >
            upload photo
          </button>
        )}

        {isCatUploaded.sent && isCatUploaded.success && (
          <div className="upload__success-container">
            <div className="upload__success">
              Thanks for the Upload - Cat found!
            </div>
          </div>
        )}

        {isCatUploaded.sent && selectedImage && (
          <div style={{ margin: '10px auto' }}>
            <ReactLoading
              type={'spin'}
              color={'#FF868E'}
              height={25}
              width={25}
              delay={0}
            />
          </div>
        )}
      </>
    // </div>
  )
}
