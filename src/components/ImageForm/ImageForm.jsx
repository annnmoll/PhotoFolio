import React, { useEffect, useRef } from "react";
import styles from "./ImageForm.module.css";
import { addPhotoToAlbum } from "../../utils/addPhotoToAlbum";
import { updatePhotoInAlbum } from "../../utils/updatePhotoInAlbum";

function ImageForm({ album, imageToBeEdit, setImageToBeEdit }) {
  const formRef = useRef();

  useEffect(() => {
    if (imageToBeEdit) {
      formRef.current.title.value = imageToBeEdit.title;
      formRef.current.url.value = imageToBeEdit.url;
    }
  }, [imageToBeEdit]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (imageToBeEdit) {
      const updatedData = {
        title: formRef.current.title.value,
        url: formRef.current.url.value,
      };
      updatePhotoInAlbum(album.id, imageToBeEdit.id, updatedData);
      setImageToBeEdit(null);
      formRef.current.title.value = "";
      formRef.current.url.value = "";
      return;
    }
    const title = formRef.current.title.value;
    const url = formRef.current.url.value;
    // console.log(title, url, album);
    addPhotoToAlbum(album.id, title, url);
    formRef.current.title.value = "";
    formRef.current.url.value = "";
  };
  return (
    <div className={styles.formContainer}>
      <h1>Add image to album {album.name}</h1>
      <form ref={formRef} className={styles.form} onSubmit={submitHandler}>
        <input placeholder="Title" name="title" required />
        <input placeholder="Image Url" name="url" type="url" required />
        <div>
          <button type="reset"> Clear </button>
          <button type="submit">{imageToBeEdit ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}

export default ImageForm;
