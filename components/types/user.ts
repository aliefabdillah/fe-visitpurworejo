import { Ulasan } from "./ulasan";

export type User = {
  id: number;
  username?: string;
  email?: string;
  confirmed?: boolean;
  blocked?: boolean;
  isAdmin?: boolean;
  isActive?: boolean;
  points?: number;
  hometown?: string;
  fullname?: string;
  phone?: string;
  img_profile?: {
    url: string;
    name: string;
  }
  ulasan?: Ulasan[]
}