import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
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
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
        return errorResponse;
      });
  };

  getArtikel = (
    category?: string,
    perPage?: number,
    page?: number,
    search?: string
  ) => {
    return this.instance
      .get(
        `/get/by-category?category=${category}&perPage=${perPage}&page=${page}&search=${search}`
      )
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
        return errorResponse;
      });
  };

  getArtikelDetail = (slug: string) => {
    return this.instance
      .get(`/detail/${slug}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
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
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
        return errorResponse;
      });
  };

  getArtikelAccount = (status: string) => {
    return this.instance
      .get(`/get/artikel-account?status=${status}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
        return errorResponse;
      });
  };

  createArtikel = (newArtikelData: any) => {
    return this.instance
      .post(`/`, newArtikelData, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
        return errorResponse;
      });
  };

  getEditedArtikel = (slug: string) => {
    return this.instance
      .get(`/detail/${slug}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
        return errorResponse;
      });
  };

  saveAsDraft = (edittedArtikel: any, id: string) => {
    return this.instance
      .put(`/edit-artikels/${id}`, edittedArtikel, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
        return errorResponse;
      });
  };

  ajukanPublikasi = (slug: string) => {
    return this.instance
      .put(`/ajukan-publikasi/${slug}`, null, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response
          ? error.response.data
          : {
              error: {
                message: error.message,
                name: error.name,
                status: error.status,
              },
            };
        return errorResponse;
      });
  };
}
