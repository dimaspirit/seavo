import { firebaseDB } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { IApplication } from '../interfaces/applications';


export const createNewApplication = async(data:IApplication) => {
  const applicationRef = doc(collection(firebaseDB, "applications"));

  data.uid = applicationRef.id;
  data.created = serverTimestamp();

  await setDoc(applicationRef, data);
}
