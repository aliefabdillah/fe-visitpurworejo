import { createSlug } from "@/components/lib/slug";
import { artikelService } from "../services";

export async function createArtikelAction(prevState: any, formData: FormData){
  const title = formData.get('title');
  const slug =  createSlug(title ? title.toString() : "random title");

  const formattedData = {
    title: title,
    slug: slug,
  }

  const newArtikelData  = new FormData()
  newArtikelData.append('data', JSON.stringify(formattedData))

  const responseData = await artikelService.createArtikel(newArtikelData)
  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: 'Response Error',
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: responseData.error,
      message: "Failed to create Artikel",
    };
  }

  return {
    // ...prevState,
    isLoading: false,
    isSuccess: true,
    strapiErrors: null,
    message: responseData.message,
  };
}