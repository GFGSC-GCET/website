import { database } from "./";
import { ref, get, set } from "firebase/database";

export const teamDatabase = {
  get: async () => {
    const userRef = ref(database, "users");
    const snapshot = await get(userRef);
    const team = await snapshot.val();
    //convert object to array
    const teamArray = Object.keys(team).map((key) => ({
      uid: key,
      ...team[key],
    }));
    //remove fields that are not required
    teamArray.forEach(member => {
      delete member.email;
      delete member.whatsappNumber;
    });
    return teamArray;
  }
};