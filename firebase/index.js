import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

import { ref, get, set, remove } from "firebase/database";

import {
   getStorage,
   ref as refStorage,
   uploadBytes,
   getDownloadURL,
   listAll,
   deleteObject,
   getBytes
} from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyCw7dLqM20bShc05N4Stw8GCG57-j5dA9k",
   authDomain: "test-e9ba9.firebaseapp.com",
   databaseURL: "https://test-e9ba9-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "test-e9ba9",
   storageBucket: "test-e9ba9.appspot.com",
   messagingSenderId: "754359676281",
   appId: "1:754359676281:web:320af50d0a370edffb13a8",
   measurementId: "G-VQ7F33JXGH"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);


export default class DB {
   static async boot() {
      this.firebaseApp = initializeApp(firebaseConfig);
      this.db = getDatabase(firebaseApp);
      this.storage = getStorage(firebaseApp);
      getAnalytics(this.firebaseApp);
   }

   static async getImgStorage(link){
      const linkStorage = refStorage(this.storage, link);
      return await getBytes(linkStorage);
   }

   static async sendImg(path, file) {
      const itemsRef = refStorage(this.storage, path);
      await uploadBytes(itemsRef, file);
      return getDownloadURL(refStorage(this.storage, path));
   }

   static async getData(path) {
      return (await get(ref(this.db, path))).val();
   }

   static async getArray(path) {
      return (await get(ref(this.db, path))).val();
   }

   static async sendData(path, data) {
     await set(ref(this.db, path), data);
   }

   static async deleteStorage(link) {
      const deleteArray = await (await listAll(refStorage(this.storage, link))).items;
      for (const i in deleteArray){
         let itemLink = refStorage(this.storage, `${link}/${i}`)
         await deleteObject(itemLink);
      }
   }
   

   static async deleteStorageItem(link){
      await deleteObject(refStorage(this.storage, link));
   }
   static async removeData(link){
      remove(ref(this.db, link));
   }
   
}

export {
   firebaseApp,
   database,
   storage,
   firebaseConfig
}

