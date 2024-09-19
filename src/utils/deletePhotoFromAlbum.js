import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseInit";
import { toast } from "react-toastify";

export const deletePhotoFromAlbum = async (albumId, photoId) => {
  try {
    const photoRef = doc(db, `albums/${albumId}/images`, photoId);
    await deleteDoc(photoRef);
    console.log("Photo deleted from Firestore");
    toast.success("Photo deleted successfully");
  } catch (error) {
    console.error("Error deleting photo: ", error);
  }
};
