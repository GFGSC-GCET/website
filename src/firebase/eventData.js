import { database } from "./";
import { ref, get, set, update } from "firebase/database";

export const getEvent = async (eventId) => {
  const dbRef = ref(database, `events/${eventId}`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}

export const setEvent = async (eventId, data) => {
  const dbRef = ref(database, `events/${eventId}`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    await update(dbRef, data);
  } else {
    await set(dbRef, data);
  }
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
