import React, { useRef } from "react";
import styles from "./Albumform.module.css";
import { addAlbum } from "../../utils/addAlbum";

function AlbumForm() {
  const formRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const albumName = formRef.current.name.value;
    addAlbum(albumName);
    formRef.current.name.value = "";
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create an album</h1>
      <form ref={formRef} className={styles.form} onSubmit={submitHandler}>
        <input placeholder="Album Name" name="name" />
        <button type="reset"> Clear </button>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AlbumForm;
