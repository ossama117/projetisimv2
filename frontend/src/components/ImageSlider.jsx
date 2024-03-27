import { useState, useEffect } from "react";
import "../style/ImageSlider.css";

const leftArrowStyles = {
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const rightArrowStyles = {
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNext, 6000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div style={sliderStyles}>
      <div>
        <div className="image">
          <div
            className="slide"
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          >
            <div onClick={goToPrevious} style={leftArrowStyles}>
              ❰
            </div>
            <div onClick={goToNext} style={rightArrowStyles}>
              ❱
            </div>
            <div className="description-container">
              <p className="description">{slides[currentIndex].description}</p>
              {slides[currentIndex].description && (
                <a
                  className="button"
                  href={slides[currentIndex].link}
                  target="blank"
                >
                  En savoir plus
                </a>
              )}
            </div>
          </div>
        </div>
        <div style={dotsContainerStyles}>
          {slides.map((slide, slideIndex) => (
            <div
              className="dot"
              style={dotStyle}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
