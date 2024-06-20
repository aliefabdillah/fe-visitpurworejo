import { LikeDislike } from "./likeDislike";
import { User } from "./user";
import { Wisata } from "./wisata";

export type Ulasan = {
  id: number;
  content?: string
  like?: string;
  dislike?: string;
  isDeleted?: boolean;
  posting_date?: string;
  user_id?: User;
  wisata?: Wisata;
  child_comment?: Ulasan[]
  likeDislike?: LikeDislike[]
  replied_to?: {
    id: number;
    user?: User
  }
}