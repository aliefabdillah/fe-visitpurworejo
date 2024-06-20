import { createSlug } from "@/components/lib/slug";
import { artikelService } from "../services";
import { convertDateToISOString } from "@/components/lib/formatter";
import { formArtikelSchema } from "@/components/lib/definition";

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

export async function editArtikelAction(prevState: any, formData: FormData) {
  const imgCoverFile = formData.get("img_cover");
  
  var validatedFields;
  if (imgCoverFile instanceof File && imgCoverFile.size === 0) {
    validatedFields = formArtikelSchema.safeParse({
      title: formData.get("judul"),
      short_content: formData.get("short_content"),
      content: formData.get("content"),
      kategori_id: formData.get("kategori"),
      publish_date: formData.get("tanggalUpload"),
    }) 
    
  } else {
    validatedFields = formArtikelSchema.safeParse({
      title: formData.get("judul"),
      short_content: formData.get("short_content"),
      content: formData.get("content"),
      kategori_id: formData.get("kategori"),
      publish_date: formData.get("tanggalUpload"),
      img_cover: formData.get("img_cover"),
    }) 
  }

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Edit",
    };
  }

  const formattedArtikelData = {
    title: validatedFields.data.title,
    slug: createSlug(validatedFields.data.title),
    short_content: validatedFields.data.short_content,
    content: validatedFields.data.content,
    kategori_id: validatedFields.data.kategori_id,
    publish_date: convertDateToISOString(validatedFields.data.publish_date),
  }
  
  
  const newArtikelData = new FormData();
  newArtikelData.append('data', JSON.stringify(formattedArtikelData));
  newArtikelData.append('files.img_cover', validatedFields.data.img_cover);

  const editedArtikelId = formData.get("id")?.toString();
  const responseData = await artikelService.saveAsDraft(newArtikelData, editedArtikelId ? editedArtikelId : "")
  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      isLoading: false,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to edit Artikel",
    };
  }

  window.location.reload();
  return {
    // ...prevState,
    isLoading: false,
    isSuccess: true,
    strapiErrors: null,
    zodErrors: null,
    message:  responseData.message,
  };
}