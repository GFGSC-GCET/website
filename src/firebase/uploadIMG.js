import { storage } from "./index";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"

export const uploadIMG = async (file, path) => {
  //allow only images
  if (!file.type.match("image.*")) {
    return;
  }
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
