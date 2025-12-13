import { useState } from "react";
import axios from "axios";

const useImageUpload = (defaultImage) => {
  const [imageLoading, setImageLoading] = useState(false);

  const uploadImage = async (imageFile) => {
    try {
      setImageLoading(true);

      if (!imageFile) {
        return defaultImage;
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      const image_api_link = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imgBB_apiKey
      }`;

      const res = await axios.post(image_api_link, formData);
      return res.data.data.display_url;
    } catch {
      return defaultImage;
    } finally {
      setImageLoading(false);
    }
  };

  return { uploadImage, imageLoading };
};

export default useImageUpload;
