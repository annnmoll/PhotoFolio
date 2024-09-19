import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseInit";

export const fetchAlbums = (setAlbums, setLoading) => {
  setLoading(true);
  const albumCollection = collection(db, "albums");
  onSnapshot(albumCollection, (snapshot) => {
    const albums = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAlbums(albums);
    setLoading(false);
  });
};
