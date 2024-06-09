import { User } from "./user";
import { Wisata } from "./wisata";

export type Tiket = {
  id: number;
  name?: string;
  email?: string;
  total_pembayaran?: number;
  order_id?: string;
  transaction_id?: string;
  payment_link?: string
  quantity?: number;
  status?: string;
  user?: User;
  wisata?: Wisata
}