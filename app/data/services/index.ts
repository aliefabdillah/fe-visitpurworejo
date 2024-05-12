import { BASE_URL } from "@/app/constants";
import { AuthService } from "./auth-services";
import { ArtikelService } from "./artikel-services";
import { WisataService } from "./wisata-services";

export const authService = new AuthService(`${BASE_URL}/auth`);
export const artikelService = new ArtikelService(`${BASE_URL}/artikels`);
export const wisataService = new WisataService(`${BASE_URL}/wisatas`);