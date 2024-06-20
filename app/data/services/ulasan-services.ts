import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class UlasanService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getUlasanByJenis = (jenis: string) => {
    return this.instance
      .get(`/get/review-wisata?jenis_wisata=${jenis}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response
          ? error.response.data
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
        return errorResponse;
      });
  };

  getUlasanAccount = () => {
    return this.instance
    .get(`/profile/ulasan-account`, {
      headers: getAuthorizationHeader()
    })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response
          ? error.response.data
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
      return errorResponse;
    });
  }

  geTotalUlasanWisata = (slug: string) => {
    return this.instance
    .get(`/total-ulasan/${slug}`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response
          ? error.response.data
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
      return errorResponse;
    });
  }

  getUlasanWisata = (slug: string) => {
    return this.instance
    .get(`/ulasan-wisata/${slug}`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response
          ? error.response.data
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
      return errorResponse;
    });
  }

  createUlasan = (ulasanData: any) => {
    return this.instance
    .post(`/`, ulasanData, {
      headers: getAuthorizationHeader()
    })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response
          ? error.response.data
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
      return errorResponse;
    });
  }

  editUlasan = (id: number, newUlasan: any) => {
    return this.instance
    .put(`/${id}`, newUlasan, {headers: getAuthorizationHeader()})
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response
          ? error.response.data
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
      return errorResponse;
    });
  }

  deleteUlasan = (id: number) => {
    return this.instance
    .delete(`/${id}`, {headers: getAuthorizationHeader()})
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response
          ? error.response.data
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
      return errorResponse;
    });
  }
}
