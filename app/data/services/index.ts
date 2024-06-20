import { AuthService } from "./auth-services";
import { ArtikelService } from "./artikel-services";
import { WisataService } from "./wisata-services";
import { UlasanService } from "./ulasan-services";
import { KategoriService } from "./kategori-services";
import { WisataSlugService } from "./wisata-slug-services";
import { WisataFavoriteService } from "./wisata-favorite-services";
import { UserService } from "./user-services";
import { HadiahService } from "./hadiah-services";
import { ProfileService } from "./profile-services";
import { LaporanUlasanService } from "./laporan-ulasan-service";
import { LikeDislikeService } from "./like-dislike-ulasan";
import { TiketService } from "./tiket-services";

const STRAPI_URL = process.env.STRAPI_URL;

export const authService = new AuthService(`${STRAPI_URL}/auth`);
export const artikelService = new ArtikelService(`${STRAPI_URL}/artikels`);
export const wisataService = new WisataService(`${STRAPI_URL}/wisatas`);
export const wisataSlugService = new WisataSlugService(`${STRAPI_URL}/slugify/slugs/wisata`);
export const wisataFavoriteService = new WisataFavoriteService(`${STRAPI_URL}/wisata-favorites`);
export const ulasanService = new UlasanService(`${STRAPI_URL}/ulasans`);
export const laporanUlasanService = new LaporanUlasanService(`${STRAPI_URL}/laporan-ulasans`);
export const likeDislikeService = new LikeDislikeService(`${STRAPI_URL}/like-dislike-ulasans`);
export const kategoriService = new KategoriService(`${STRAPI_URL}/kategoris`)
export const userService = new UserService(`${STRAPI_URL}/users`) 
export const hadiahService = new HadiahService(`${STRAPI_URL}/hadiahs`)
export const profileService = new ProfileService(`${STRAPI_URL}/profiles`)
export const tiketService = new TiketService(`${STRAPI_URL}/tikets`)