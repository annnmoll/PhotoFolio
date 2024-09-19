import React, { useEffect, useState } from "react";
import AlbumForm from "../AlbumForm/AlbumForm";
import styles from "./AlbumList.module.css";
import AlbumIcon from "../../assets/image-gallery_3342137.png";
import ImageList from "../ImageList/ImageList";
import { fetchAlbums } from "../../utils/fetchAlbums";
import Spinner from "react-spinner-material";

function AlbumList({ setLoading, loading }) {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumform, setAlbumForm] = useState(false);

  useEffect(() => {
    // console.log("fetching");
    fetchAlbums(setAlbums, setLoading);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
      </div>
    );
  }

  if (selectedAlbum) {
    return (
      <ImageList
        album={selectedAlbum}
        setAlbum={setSelectedAlbum}
        setLoading={setLoading}
      />
    );
  }

  return (
    <div>
      {albumform && <AlbumForm />}
      <div className={styles.listContainer}>
        <div className={styles.listTitle}>
          <h2>Your Albums</h2>
          <button
            onClick={() => setAlbumForm(!albumform)}
            className={!albumform ? styles.addBtn : styles.cancelBtn}
          >
            {!albumform ? "Add Album" : "Cancel"}
          </button>
        </div>
        <ul>
          {albums.map((album) => (
            <li
              key={album.id}
              className={styles.card}
              onClick={() => setSelectedAlbum(album)}
            >
              <div>
                <img src={AlbumIcon} />
              </div>
              <p>{album.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AlbumList;
