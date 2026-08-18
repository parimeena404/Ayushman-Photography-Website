import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 'hjrdxocb',
  api_key: process.env.CLOUDINARY_API_KEY || '227124848528486',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'SdjjM963t7rJfFCP9j9tlwYub5I',
  secure: true,
});

export default cloudinary;

/**
 * Upload a local image buffer or base64 data to Cloudinary
 */
export async function uploadImageToCloudinary(
  fileBase64OrUrl: string,
  folder: string = 'ayushman_print_products'
): Promise<{ url: string; public_id: string }> {
  try {
    const result = await cloudinary.uploader.upload(fileBase64OrUrl, {
      folder,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error?.message || 'Failed to upload image to Cloudinary');
  }
}
