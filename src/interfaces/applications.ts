import { FieldValue } from "firebase/firestore";

export interface IApplication {
  uid?: string;
  status: number;
  position: string;
  companyName: string;
  location: string;
  requirements: string;
  responsibilities: string;
  salary: string;
  url: string;
  notes: string;
  created?: FieldValue;
  createdBy: string;
}