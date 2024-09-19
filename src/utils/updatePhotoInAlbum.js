import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseInit";
import { toast } from "react-toastify";
// Function to update photo metadata in Firestore
export const updatePhotoInAlbum = async (albumId, photoId, updatedData) => {
  try {
    const photoRef = doc(db, `albums/${albumId}/images`, photoId);
    await updateDoc(photoRef, updatedData); // updatedData is an object containing the fields to be updated
    console.log("Photo content updated in Firestore");
    toast.success("Updated successfully");
  } catch (error) {
    console.error("Error updating photo: ", error);
  }
};
