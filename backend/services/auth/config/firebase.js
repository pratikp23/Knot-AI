
// import admin from  "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";

import serviceAccount from  "path/to/serviceAccountKey.json" with {type: "json" };

export const app = initializeApp({
  credential: cert(serviceAccount)
//   credential: admin.credential.cert(serviceAccount)
});


