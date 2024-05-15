import { User } from "./user";
import { Wisata } from "./wisata";

export type Ulasan = {
  id: number;
  content?: string
  like?: string;
  dislikes?: string;
  isDeleted?: boolean;
  posting_date?: string;
  user_id?: User;
  wisata?: Wisata;
  child_comment?: Ulasan[]
}