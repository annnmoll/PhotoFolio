import React, { useEffect, useRef, useState } from "react";
import styles from "./ImageList.module.css";
import ImageForm from "../ImageForm/ImageForm";
import Carousel from "../Carousel/Carousel";
import { fetchPhotos } from "../../utils/fetchPhotos";
import { deletePhotoFromAlbum } from "../../utils/deletePhotoFromAlbum";
import Spinner from "react-spinner-material";

function ImageList({ album, setAlbum }) {
  const searchRef = useRef();
  const [imageform, setImageform] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selctedImageIndex, setSelectedImageIndex] = useState(-1);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [imageToBeEdit, setImageToBeEdit] = useState(null);

  useEffect(() => {
    fetchPhotos(album.id, setImages, setLoading);
  }, []);

  useEffect(() => {
    setFilteredImages(images);
  }, [images]);

  const handleFilter = () => {
    const searchedTerm = searchRef.current.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    const filtered = images.filter((image) =>
      image.title.toLowerCase().includes(searchedTerm)
    );
    setFilteredImages(filtered);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
      </div>
    );
  }
  return (
    <div>
      {(imageform || imageToBeEdit) && (
        <ImageForm
          album={album}
          imageToBeEdit={imageToBeEdit}
          setImageToBeEdit={setImageToBeEdit}
        />
      )}
      <div className={styles.listContainer}>
        <div className={styles.listTitle}>
          <div className={styles.listHeading}>
            <div
              onClick={() => {
                setAlbum(null);
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/709/709624.png"
                alt="Back"
              />
            </div>
            <h2>
              {images.length > 0
                ? `Images in album ${album.name}`
                : `No image in ${album.name}`}
            </h2>
          </div>
          <div className={styles.listActions}>
            {images.length > 0 && (
              <input
                placeholder="Search"
                className={styles.searchInput}
                ref={searchRef}
                onChange={handleFilter}
              />
            )}
            <button
              onClick={() => {
                if (imageToBeEdit) {
                  setImageToBeEdit(null);
                  setImageform(false);
                } else {
                  setImageform(!imageform);
                }
              }}
              className={!imageform ? styles.addBtn : styles.cancelBtn}
            >
              {!imageform ? "Add Image" : "Cancel"}
            </button>
          </div>
        </div>
        <ul className={styles.imageList}>
          {filteredImages.map((image, index) => (
            <li
              key={image.id}
              // className={styles.card}
              // onClick={() => setSelectedAlbum(album)}
            >
              <div
                className={styles.cardContainer}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img src={image.url} alt={image.title} />
                <h3>{image.title}</h3>
                <div className={styles.actionIconContainer}>
                  <img
                    className={styles.edit}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageform(true);
                      setImageToBeEdit(image);
                    }}
                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                  />
                  <img
                    className={styles.delete}
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePhotoFromAlbum(album.id, image.id);
                    }}
                    src="https://cdn-icons-png.flaticon.com/128/6460/6460112.png"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        {selctedImageIndex >= 0 && (
          <Carousel
            images={images}
            selectedImageIndex={selctedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        )}
      </div>
    </div>
  );
}

export default ImageList;
