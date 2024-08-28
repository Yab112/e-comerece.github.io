import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-[300px] max-w-lg mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:3000/image/${image}`}
              alt={`Slide ${index + 1}`}
              className="w-full"
            />
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-amber-600 p-2 text-5xl rounded-full"
        onClick={goToPrevious}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2  text-amber-600 text-5xl p-2 rounded-full"
        onClick={goToNext}
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
