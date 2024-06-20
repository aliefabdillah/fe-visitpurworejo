import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class WisataService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getDetailsWisata = (slug: string) => {
    return this.instance;
  };

  getPopularWisata = () => {
    return this.instance
      .get(`/get/popular`)
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

  getGallery = () => {
    return this.instance
      .get(`?populate[0]=img_cover&sort[0]=createdAt:desc&pagination[limit]=10`)
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

  getWisataByJenis = (
    name: string,
    jenis: string,
    page?: number,
    pageSize?: number
  ) => {
    return this.instance
      .get(
        `?populate[0]=img_cover&sort=name:asc${page ? `&pagination[page]=${page}` : ""}${
          pageSize ? `&pagination[pageSize]=${pageSize}` : ""
        }&filters[jenis_wisata][$containsi]=${jenis}&filters[name][$containsi]=${name}`
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

  searchWisata = (
    name: string,
    jenis: string,
    page: number,
    pageSize: number
  ) => {
    return this.instance
      .get(
        `?populate[0]=img_cover&sort=name:asc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[jenis_wisata][$containsi]=${jenis}`
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
}
