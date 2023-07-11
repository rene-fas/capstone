import cloudinary from "cloudinary";
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        res.status(500).json({ error: "Image upload failed" });
        return;
      }

      const file = files.file;

      if (!file) {
        res.status(400).json({ error: "Missing required parameter - file" });
        return;
      }

      cloudinary.v2.uploader.upload(
        file.path,
        { folder: process.env.CLOUDINARY_FOLDER },
        (error, result) => {
          if (error) {
            console.error("Error uploading image:", error);
            res.status(500).json({ error: "Image upload failed" });
          } else {
            const imageUrl = result.secure_url;
            res.status(200).json({ imageUrl });
          }
        }
      );
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
