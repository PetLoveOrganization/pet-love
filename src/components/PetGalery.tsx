import { XIcon } from '@/icons/X'
import type { PetImage } from '@/types'
import React, { useState, useEffect, useCallback } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface PetGalleryProps {
  images: PetImage[]
}

export const PetGallery: React.FC<PetGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(() => {
    const primaryImage = images.find((img) => img.is_primary)
    return primaryImage?.image_url || images[0].image_url
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const currentImage = images[currentIndex]
  useEffect(() => {
    if (images.length > 0) {
      const idx = images.indexOf(currentImage)
      setCurrentIndex(idx !== -1 ? idx : 0)
    }
  }, [selectedImage, images])

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false)
      if (isModalOpen) {
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, nextImage, prevImage])

  if (!images || images.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400">There are no images available for this pet.</p>
      </div>
    )
  }

  const { image_url } = currentImage

  return (
    <div className="flex flex-col gap-6 w-full ">
      <div
        className="relative group w-full aspect-video rounded-3xl overflow-hidden bg-gray-200 shadow-2xl cursor-zoom-in"
        onClick={() => {
          setSelectedImage(image_url)
          setIsModalOpen(true)
        }}
      >
        <img
          key={currentIndex}
          src={image_url}
          alt="Vista principal"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 animate-pet-fade"
        />
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {images.map(({ image_url }, index) => (
          <button
            key={`${image_url}-${index}`}
            onClick={() => {
              setCurrentIndex(index)
              setSelectedImage(image_url)
            }}
            className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 transform ${
              currentIndex === index
                ? 'ring-3 ring-green-500 ring-offset-1 scale-95'
                : 'opacity-50 hover:opacity-100 hover:scale-105'
            }`}
          >
            <img src={image_url} className="w-full h-full object-cover" alt={`Miniature ${index}`} loading="lazy" />
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-110"
            onClick={() => setIsModalOpen(false)}
          >
            <XIcon className="w-10 h-10" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4">

            <button
              className="absolute left-6 z-110 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hidden md:block"
              onClick={prevImage}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Area de Zoom */}
            <div className="max-w-5xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Zoom>
                <img
                  src={image_url}
                  alt="Pet detail"
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              </Zoom>
            </div>

            <button
              className="absolute right-6 z-110 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hidden md:block"
              onClick={nextImage}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Info inferior */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2">
            <span className="text-white/50 text-xs uppercase tracking-[0.3em]">PetLove Gallery</span>
            <div className="text-white font-medium text-lg bg-white/10 px-4 py-1 rounded-full">
              {currentIndex + 1} <span className="text-white/40">/</span> {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PetGallery
