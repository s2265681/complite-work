import { useAtom } from 'jotai'
import { carouselItemsAtom, currentCarouselIndexAtom } from '../stores'
import { useEffect, useRef } from 'react'

export const Carousel3D = () => {
  const [carouselItems] = useAtom(carouselItemsAtom)
  const [currentIndex, setCurrentIndex] = useAtom(currentCarouselIndexAtom)
  const containerRef = useRef<HTMLDivElement>(null)

  const radius = 400
  const totalItems = carouselItems.length
  const angleStep = (2 * Math.PI) / totalItems

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const items = container.querySelectorAll('.carousel-item')

    items.forEach((item, index) => {
      const angle = index * angleStep - currentIndex * angleStep
      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius
      const opacity = Math.abs(z) < radius * 0.5 ? 1 : 0.3
      const scale = Math.abs(z) < radius * 0.3 ? 1 : 0.8
      const rotationY = (angle * 180) / Math.PI

      ;(item as HTMLElement).style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotationY}deg) scale(${scale})`
      ;(item as HTMLElement).style.opacity = opacity.toString()
    })
  }, [currentIndex, carouselItems, radius, angleStep])

  const handleItemClick = (index: number) => {
    setCurrentIndex(index)
  }

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + totalItems) % totalItems)
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalItems)
  }

  return (
    <div className="relative w-full h-96 overflow-hidden bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* 3D容器 */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className="carousel-item absolute top-1/2 left-1/2 w-64 h-48 cursor-pointer transition-all duration-500 ease-out"
            style={{
              transform: 'translate(-50%, -50%)',
              transformStyle: 'preserve-3d'
            }}
            onClick={() => handleItemClick(index)}
          >
            <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title || `Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {item.title}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 控制按钮 */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-blue-500'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 