export type User = {
  id: number;
  username?: string;
  email?: string;
  confirmed?: boolean;
  blocked?: boolean;
  isAdmin?: boolean;
  iActive?: boolean;
  points?: number;
  hometown?: string;
  fullname?: string;
  img_profile?: {
    url: string;
    name: string;
  }
}