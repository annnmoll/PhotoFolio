import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseInit";

export const fetchPhotos = (albumId, setPhotos, setLoading) => {
  setLoading(true);
  const photosCollection = collection(db, `albums/${albumId}/images`);
  onSnapshot(photosCollection, (snapshot) => {
    const photos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPhotos(photos);
    setLoading(false);
  });
};
