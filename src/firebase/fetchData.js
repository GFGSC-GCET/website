import { database } from "./";
import { ref, get, set } from "firebase/database";

export const teamDatabase = {
  get: async () => {
    const teamRef = ref(database, "team");
    const snapshot = await get(teamRef);
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

export const userDatabase = {
  get: async () => {
    const userRef = ref(database, "users");
    const snapshot = await get(userRef);
    const users = await snapshot.val();
    //convert object to array
    const usersArray = Object.keys(users).map((key) => ({
      uid: key,
      ...team[key],
    }));
    //remove fields that are not required
    users.forEach(member => {
      delete member.email;
      delete member.whatsappNumber;
    });
    return users;
  }
};