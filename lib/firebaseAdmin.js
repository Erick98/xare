import admin from "firebase-admin";

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "bernav-capital",
      private_key_id: "be5019de694b7a4b92773e313066d30c56eb7398",
      private_key: process.env.GOOGLE_BERNAV_PRIVATE_KEY,
      client_email:
        "firebase-adminsdk-4ppl1@bernav-capital.iam.gserviceaccount.com",
      client_id: "107546891085154052868",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4ppl1%40bernav-capital.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    }),
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
