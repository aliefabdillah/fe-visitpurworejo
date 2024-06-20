export type Artikel = {
  id?: number
  judul?: string;
  slug?: string;
  kategori?: {
    id: string;
    name?: string;
    slug?: string;
  };
  status?: string;
  cover?: {
    url: string;
    name: string;
  };
  notes?: string;
  short_content?: string;
  tanggal_upload?: string;
  uploader?: {
    name: string;
    isAdmin?: boolean;
    img_profile?: string;
  };
  konten: string;
};

export type ArtikelHero= {
  id: string;
  slug: string;
  title: string;
  short_content: string;
  cover: {
    url: string;
    name: string;
  };
};

export type CeritaKamiProps ={
  id: string;
  slug: string;
  title: string;
  short_content: string;
  cover: {
    url: string;
    name: string;
  };
  user: {
    username: string;
    hometown: string;
    img_profile: string;
  }
}
