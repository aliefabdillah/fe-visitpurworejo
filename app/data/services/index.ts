import { BASE_URL } from "@/app/constants";
import { AuthService } from "./auth-services";
import { ArtikelService } from "./artikel-services";
import { WisataService } from "./wisata-services";
import { UlasanService } from "./ulasan-services";
import { KategoriService } from "./kategori-services";
import { WisataSlugService } from "./wisata-slug-services";
import { WisataFavoriteService } from "./wisata-favorite-services";

export const authService = new AuthService(`${BASE_URL}/auth`);
export const artikelService = new ArtikelService(`${BASE_URL}/artikels`);
export const wisataService = new WisataService(`${BASE_URL}/wisatas`);
export const wisataSlugService = new WisataSlugService(`${BASE_URL}/slugify/slugs/wisata`);
export const wisataFavoriteService = new WisataFavoriteService(`${BASE_URL}/wisata-favorites`);
export const ulasanService = new UlasanService(`${BASE_URL}/ulasans`);
export const kategoriService = new KategoriService(`${BASE_URL}/kategoris`)