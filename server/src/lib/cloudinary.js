// Ref: https://cloudinary.com/documentation/node_quickstart#configure_cloudinary

// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary";

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

/**
 * Upload an image file
 */
export const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "team65",
  };

  const result = await cloudinary.uploader.upload(imagePath, options);

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
};

/**
 * Remove an image file
 */
export const removeImage = async (public_id) => {
  const result = await cloudinary.uploader.destroy(public_id);

  return result;
};
