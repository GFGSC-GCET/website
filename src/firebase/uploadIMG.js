import { storage } from "./index";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"

export const uploadIMG = async (file, path) => {
  //allow only images
  if (!file.type.match("image.*")) {
    return;
  }
  const storageRef = ref(storage, path);
  console.log(storageRef)
  const snapshot = await uploadBytes(storageRef, file);
  console.log(snapshot)
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
