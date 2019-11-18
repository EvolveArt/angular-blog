import { Timestamp } from "@firebase/firestore-types";

export interface Post {
  id?: string;
  title: string;
  content: string;
  loveIts: number;
  // tslint:disable-next-line: variable-name
  created_at: Timestamp;
}
