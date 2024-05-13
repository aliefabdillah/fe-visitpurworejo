import { User } from "./user";

export type Ulasan = {
  id: number;
  content?: string
  like?: string;
  dislikes?: string;
  isDeleted?: boolean;
  user_id?: User
}