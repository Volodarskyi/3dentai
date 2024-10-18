import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsGmum0PetsvjRAkJio5u6nWRQitUzetM",
  authDomain: "dentai-9ba0d.firebaseapp.com",
  projectId: "dentai-9ba0d",
  storageBucket: "dentai-9ba0d.appspot.com",
  appId: "1:870730109683:web:67e678fd5e5a6ef5eadd86",
  measurementId: "870730109683",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
