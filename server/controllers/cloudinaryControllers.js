import { v2 as cloudinary } from "cloudinary";
import { cloudinarySecret } from "../config.js";

export async function getCloudinarySignature(req, res) {
  cloudinary.config({
    cloud_name: "deanbe7nk",
    api_key: "325373837994629",
    api_secret: cloudinarySecret,
    signature_algorithm: "sha1",
  });

  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ error: "publicId is required" });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id: publicId,
        upload_preset: "resippys_signed_preset",
      },
      cloudinarySecret
    );

    return res.status(200).json({ timestamp, signature, publicId });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return res.status(500).json({ error: "Failed to generate signature" });
  }
}

// TO DO:
// add the signed code to updaterecipes
// come up with strategy for shared public_id (this may need to be added to signature generator later)
// integrate other photos to cloudinary
// Solution idea: folders? multipart upload? separate unique ID generated with a library
