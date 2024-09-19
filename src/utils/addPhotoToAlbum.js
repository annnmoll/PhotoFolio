import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseInit";
import { toast } from "react-toastify";

export const addPhotoToAlbum = async (albumId, title, photoUrl) => {
  try {
    await addDoc(collection(db, `albums/${albumId}/images`), {
      title: title,
      url: photoUrl,
      createdAt: new Date(),
    });
    toast.success("Image added successfully");
  } catch (e) {
    console.error("Error adding photo: ", e);
  }
};
