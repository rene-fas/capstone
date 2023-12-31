import process from "node:process";
import cloudinary from "cloudinary";
import formidable from "formidable";

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

export default async function handler(request, response, filepath) {
  const { currentOutcropId, currentFieldTripId } = request.query;

  switch (request.method) {
    case "POST":
      await new Promise((resolve, reject) => {
        const form = formidable({});
        form.parse(request, async (error, fields, files) => {
          if (error) {
            reject(error);
          } else {
            const { file } = files;
            const { newFilename, filepath } = file;
            const folderName = `${currentFieldTripId}_${currentOutcropId}`;
            const result = await cloudinary.v2.uploader.upload(filepath, {
              public_id: newFilename,
              folder: folderName,
            });
            response.status(201).json(result);
            resolve();
          }
        });
      });
      break;
    default:
      response.status(400).json({ message: "Method not implemented" });
      break;
  }
}
