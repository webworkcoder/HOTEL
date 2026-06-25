import cloudinary from "./cloudinary";

export const uploadImage = async (file: string) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "hotel-rooms",
  });

  return result.secure_url;
};
