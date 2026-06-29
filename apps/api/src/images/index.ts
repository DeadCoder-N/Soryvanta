import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  buffer: Buffer,
  folder = 'brisvora/properties'
): Promise<{ url: string; thumbnailUrl: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) return reject(error)
        const thumbnailUrl = cloudinary.url(result.public_id, {
          width: 400,
          height: 300,
          crop: 'fill',
          quality: 'auto',
          fetch_format: 'auto',
        })
        resolve({ url: result.secure_url, thumbnailUrl })
      }
    )
    stream.end(buffer)
  })
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}
