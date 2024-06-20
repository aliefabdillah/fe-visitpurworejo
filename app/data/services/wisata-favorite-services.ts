import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class WisataFavoriteService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getWisataFavoriteUser = (userId: string, page?: number, perPage?: number) => {
    return this.instance
      .get(
        `?populate[wisata_id][populate][img_cover]=true&populate[user_id]=true&filters[user_id][id][$eq]=${userId}${
          perPage ? `&pagination[pageSize]=${perPage}` : ""
        }${page ? `&pagination[page]=${page}` : ""}`,
        {
          headers: getAuthorizationHeader(),
        }
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

  addToFavorite = (wisataId: string) => {
    return this.instance
      .post(`?wisata_id=${wisataId}`, null, {
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

  deleteFromFavorite = (wisataId: string) => {
    return this.instance
      .delete(`/delete/favorites?wisata_id=${wisataId}`, {
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

  deleteAllFavorite = () => {
    return this.instance
      .delete(`/delete/all`, { headers: getAuthorizationHeader() })
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
