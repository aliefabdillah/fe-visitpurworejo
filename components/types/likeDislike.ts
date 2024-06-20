import { User } from "./user";

export type LikeDislike = {
  id?: number;
  isLike?: boolean;
  isDislike?: boolean;
  ulasan_id?: number;
  user?: User
}