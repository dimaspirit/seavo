import { collection, doc, setDoc, serverTimestamp, query, where, getDocs, getDoc } from "firebase/firestore"; 
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

export const getApplicationByUID = async(uid:string) => {
  const applicationRef = doc(firebaseDB, DB_NAME, uid);
  const applicationSnap = await getDoc(applicationRef);

  if (applicationSnap.exists()) {
    return applicationSnap.data() as IApplication;
  } else {
    // docSnap.data() will be undefined in this case
    console.warn("No such document!");
    return null;
  }
}