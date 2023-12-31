import process from "node:process";
import cloudinary from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(request, response) {
  const { public_id } = request.query;
  if (request.method === "GET") {
    try {
      const result = await cloudinary.v2.search
        .expression(`public_id:${public_id}`)
        .with_field("tags")
        .execute();
      response.status(200).json(result);
    } catch (error) {
      console.error("Error fetching images:", error);
      response.status(500).json({ message: error.message });
    }
  }
}
