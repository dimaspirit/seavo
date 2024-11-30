import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { firebaseAuth } from '../firebase';

setPersistence(firebaseAuth, browserLocalPersistence);

export interface ILoginProps {
  email: string;
  password: string;
 }
 
 export interface ISignUpProps {
  email: string;
  password: string;
 }

export const firebaseSignIn = async ({ email, password }: ILoginProps) => {
  const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return result;
};

export const firebaseSignUp = async ({ email, password }: ISignUpProps) => {
  const  result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  return result;
};

export const firebaseSignOut  =  async () => {
  await  signOut(firebaseAuth);
};