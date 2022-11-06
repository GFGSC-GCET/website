import { database } from "./";
import { ref, get, set } from "firebase/database";

export const getEventData = async (eventId) => {
  const dbRef = ref(database, `events/${eventId}`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}

export const setEventData = async (eventId, data) => {
  const dbRef = ref(database, `events/${eventId}`);
  await set(dbRef, data);
}

export const getEventList = async () => {
  const dbRef = ref(database, `events`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}
