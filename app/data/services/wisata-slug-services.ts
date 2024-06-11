import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class WisataSlugService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getDetailsWisataPublic = (slug: string) => {
    return this.instance
      .get(`/${slug}?populate[0]=gallery`)
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

  getDetailsWisataAuth = (slug: string) => {
    return this.instance
      .get(
        `/${slug}?populate[gallery]=*&populate[wisata_favorite_id][populate]=user_id`,
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
          : { error: {
            message: error.message,
            name: error.name,
            status: error.status,
          } };
        return errorResponse;
      });
  };
}
