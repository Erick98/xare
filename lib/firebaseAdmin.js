import admin from "firebase-admin";
var serviceAccount = require("./bernav-capital-firebase-adminsdk-4ppl1-c1c10c9e65.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
