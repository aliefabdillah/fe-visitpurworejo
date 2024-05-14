export type Wisata = {
  id?: number;
  name?: string;
  slug?: string;
  img_cover?: {
    url: string;
    name: string;
  };
  gallery?: GalleryItem[]
  jenis_wisata?: string;
  lokasi?: string;
  konten_singkat?: string;
  deskripsi?: string;
  wisata_favorite?: WisataFavorite[]
};

export type GalleryItem = {
  name: string;
  url: string;
};

export type WisataFavorite = {
  id: number;
  wisata_id: number;
  user_id: number;
}