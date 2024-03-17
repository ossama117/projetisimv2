import { useState, useEffect } from "react";
import "../style/ImageSlider.css";

const leftArrowStyles = {
  fontSize: "45px",
  color: "#000",
  zIndex: 1,
  cursor: "pointer",
};

const rightArrowStyles = {
  fontSize: "45px",
  color: "#000",
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
    const intervalId = setInterval(goToNext, 6000); // Change slide every 6 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentIndex]);

  const slideStylesWidthBackground = {
    // ... (other styles)
  };

  return (
    <div className="sliderStyles">
      <div className="insrer">
        <h1>BIENVENUE AU Institut Spécialisé Industriel Marrakech ISIM</h1>
        <a
          href="https://takwine.ofppt.ma/ERP_OFPPT/Inscription.aspx"
          target="blank"
        >
          <button className="button">s'insrer</button>
        </a>
      </div>
      <div>
        <div className="image">
          <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>
          <div style={slideStylesWidthBackground}>
            <img
              src={slides[currentIndex].url}
              alt=""
              width="700px"
              height="390px"
              className="img"
            />
          </div>
          <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div>
        </div>
        <div style={dotsContainerStyles} >
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
