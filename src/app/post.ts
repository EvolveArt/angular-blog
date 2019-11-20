import { Timestamp } from "@firebase/firestore-types";
import { User } from "./user";

export interface Post {
  id?: string;
  title: string;
  content: string;
  loveIts: number;
  // tslint:disable-next-line: variable-name
  created_at: Timestamp;
  author: User;
}
