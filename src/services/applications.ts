import { collection, doc, setDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"; 
import { firebaseDB } from '../firebase';
import { IApplication } from '../interfaces/applications';

const DB_NAME = 'applications';

export const createNewApplication = async(data:IApplication) => {
  const applicationRef = doc(collection(firebaseDB, DB_NAME));

  data.uid = applicationRef.id;
  data.created = serverTimestamp();

  await setDoc(applicationRef, data);
}

export const getApplications = async(userUID:string) => {
  const applications:IApplication[] = [];
  const q = query(collection(firebaseDB, DB_NAME), where("createdBy", "==", userUID));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    applications.push(doc.data() as IApplication);
  });
  return applications;
}
