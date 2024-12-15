import { FieldValue } from "firebase/firestore";

export interface IApplication {
  uid?: string;
  position: string;
  companyName: string;
  location: string;
  requirements: string;
  responsibilities: string;
  salary: string;
  created?: FieldValue;
  createdBy: string;
}