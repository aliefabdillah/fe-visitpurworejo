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

  addToFavorite = (wisataId: string) => {
    return this.instance
      .post(`?wisata_id=${wisataId}`, null, {
        headers: getAuthorizationHeader()
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  };

  deleteFromFavorite = (wisataId: string) => {
    return this.instance
      .delete(`/delete/favorites?wisata_id=${wisataId}`, {
        headers: getAuthorizationHeader()
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  };
}
