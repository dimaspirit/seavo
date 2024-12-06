import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { firebaseAuth } from '../firebase';
import { ILoginProps, ISignupProps } from '../interfaces/user';

setPersistence(firebaseAuth, browserLocalPersistence);

export const firebaseSignIn = async({ email, password }: ILoginProps) => {
  const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return result;
};

export const firebaseSignUp = async({ email, password }: ISignupProps) => {
  const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  return result;
};

export const firebaseSignOut = async() => {
  await signOut(firebaseAuth);
};