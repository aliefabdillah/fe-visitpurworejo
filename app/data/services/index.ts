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

const BASE_URL = process.env.BASE_URL;

export const authService = new AuthService(`${BASE_URL}/auth`);
export const artikelService = new ArtikelService(`${BASE_URL}/artikels`);
export const wisataService = new WisataService(`${BASE_URL}/wisatas`);
export const wisataSlugService = new WisataSlugService(`${BASE_URL}/slugify/slugs/wisata`);
export const wisataFavoriteService = new WisataFavoriteService(`${BASE_URL}/wisata-favorites`);
export const ulasanService = new UlasanService(`${BASE_URL}/ulasans`);
export const laporanUlasanService = new LaporanUlasanService(`${BASE_URL}/laporan-ulasans`);
export const likeDislikeService = new LikeDislikeService(`${BASE_URL}/like-dislike-ulasans`);
export const kategoriService = new KategoriService(`${BASE_URL}/kategoris`)
export const userService = new UserService(`${BASE_URL}/users`) 
export const hadiahService = new HadiahService(`${BASE_URL}/hadiahs`)
export const profileService = new ProfileService(`${BASE_URL}/profiles`)