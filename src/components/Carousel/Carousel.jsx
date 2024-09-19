import React from "react";
import styles from "./Carousel.module.css";

function Carousel({ images, selectedImageIndex, setSelectedImageIndex }) {
  const goToNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className={styles.carouselContainer}>
      <img
        className={styles.arrow}
        src="https://cdn-icons-png.flaticon.com/128/271/271220.png"
        alt="Prev"
        onClick={goToPrev}
      />
      <div className={styles.imageContainer}>
        <img src={images[selectedImageIndex].url} className={styles.image} />
        <img
          src="https://cdn-icons-png.flaticon.com/128/9068/9068699.png"
          className={styles.close}
          onClick={() => setSelectedImageIndex(-1)}
        />
      </div>

      <img
        className={styles.arrow}
        src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
        alt="Next"
        onClick={goToNext}
      />
    </div>
  );
}

export default Carousel;
