import { getAuthorizationHeader } from "@/components/lib/getAuthorizationHeader";
import axios, { AxiosInstance } from "axios";

export class LikeDislikeService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  createLikeDislikeUlasan = (likeDislikeData: any) => {
    return this.instance
    .post(`/`, likeDislikeData, {
      headers: getAuthorizationHeader()
    })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response.data;
      return errorResponse;
    });
  }

  updateLikeDislikeUlasan = (likeDislikeData: any, ulasanId: number) => {
    return this.instance
    .put(`/${ulasanId}`, likeDislikeData, {
      headers: getAuthorizationHeader()
    })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      const errorResponse = error.response.data;
      return errorResponse;
    });
  }
}
