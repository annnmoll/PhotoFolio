import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseInit";
import { toast } from "react-toastify";

export const addAlbum = async (albumName) => {
  try {
    await addDoc(collection(db, "albums"), {
      name: albumName,
      createdAt: new Date(),
    });
    toast.success("Album Added Successfully");
  } catch (e) {
    console.error("Error adding album: ", e);
  }
};
