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

  getPopularWisata = () => {
    return this.instance
      .get(`/get/popular`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  }

  getGallery = () => {
    return this.instance
      .get(`?populate[0]=img_cover&sort[0]=createdAt:desc`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        const errorResponse = error.response.data;
        return errorResponse;
      });
  };
}
