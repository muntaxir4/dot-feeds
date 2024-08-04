import { Editor } from "@tiptap/react";
import { useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";

let imageInputElement: HTMLInputElement | null = null;

const MAX_FILE_SIZE = 1024 * 1024;

export default function InsertImage({ editor }: { editor: Editor }) {
  const imageInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    imageInputElement = imageInput.current;
  }, [imageInput.current]);
  function errorToast(title?: string) {
    toast({
      variant: "destructive",
      title: title ?? "Image not found",
    });
  }
  async function uploadImage() {
    toast({
      title: "Uploading image...",
    });
    if (!imageInput.current) {
      errorToast();
      return;
    }
    const file = imageInput.current.files?.[0];
    if (!file) {
      errorToast();
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      errorToast("File size exceeds the 1MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Image uploaded successfully",
      });
      editor.chain().focus().setImage({ src: response.data.url }).run();
    } catch (error) {
      if (error instanceof AxiosError)
        errorToast(error.response?.data?.message);
      else errorToast();
    }
  }
  return (
    <input
      ref={imageInput}
      type="file"
      accept="image/*"
      onChange={uploadImage}
      className="hidden"
    />
  );
}

export { imageInputElement };
