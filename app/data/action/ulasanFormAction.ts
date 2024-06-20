import { ulasanFormSchema } from "@/components/lib/definition";
import { ulasanService } from "../services";

export async function createUlasanAction(prevState: any, formData: FormData) {
  const validatedFields = ulasanFormSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields?.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Validation input error",
    };
  }

  const parent_comment_id = formData.get("parent_comment_id");
  const replied_to = formData.get("reply_to_id");

  var formattedUlasanInput;
  if (parent_comment_id === "" || replied_to === "") {
    formattedUlasanInput = {
      content: validatedFields.data.content,
      post_wisata_id: formData.get("post_wisata_id"),
    };
  } else {
    formattedUlasanInput = {
      content: validatedFields.data.content,
      post_wisata_id: formData.get("post_wisata_id"),
      parent_comment_id: formData.get("parent_comment_id"),
      replied_to_id: formData.get("replied_to_id"),
    };
  }

  const newData = new FormData();
  newData.append("data", JSON.stringify(formattedUlasanInput));

  const response = await ulasanService.createUlasan(newData)
  
  if (!response) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: null,
      strapiErrors: 'Something went wrong',
      message: "INTERNAL SERVER ERROR",
    };
  }

  if (response.error) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: null,
      strapiErrors: response.error,
      message: "BAD REQUEST",
    };
  }

  return {
    isLoading: false,
    isSuccess: true,
    strapiErrors: null,
    zodErrors: null,
    message: response.message,
  }
}
