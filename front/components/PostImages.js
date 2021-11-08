import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false)

  const onZoom = useCallback(() => {
    setShowImagesZoom(true)
  }, [])

  if (images.length === 1) {
    return (
      <div>
        <img role="presentaion" src={images[0].src} alt={images[0].src} onClick={onZoom}></img>
      </div>
    )
  }
  if (images.length === 2) {
    return (
      <div>
        <img role="presentaion" src={images[0].src} alt={images[0].src} onClick={onZoom}></img>
        <img role="presentaion" src={images[1].src} alt={images[1].src} onClick={onZoom}></img>
      </div>
    )
  }
  return (
    <div>
      <img role="presentaion" src={images[0].src} alt={images[0].src} onClick={onZoom}></img>
      <div
        role="presentation"
        style={{
          display: 'inline-block',
          width: '50%',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
        onClick={onZoom}
      >
        <PlusOutlined></PlusOutlined>
        {images.length - 1}
        개의 사진 더보기
      </div>
    </div>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
}

export default PostImages
