import axios, { AxiosInstance } from "axios";

export class ArtikelService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getHeroArtikel = () => {
    return this.instance
      .get(`/get/hero-artikels`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  };

  getArtikel = (category: string, perPage?: number, page?: number) => {
    return this.instance
      .get(`/get/by-category?category=${category}&perPage=${perPage}&page=${page}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  };

  getCeritaKami = () => {
    return this.instance
      .get(`/get/cerita-kami`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  }
}
