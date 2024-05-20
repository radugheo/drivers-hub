import { Buffer } from "buffer";
import { s3Client } from "../../App";

export const uploadPictureToS3Bucket = async (
  base64Image: string,
): Promise<string> => {
  if (!s3Client) {
    throw new Error("S3 client is not initialized");
  }
  const base64Data = Buffer.from(
    base64Image.replace(/^data:image\/\w+;base64,/, ""),
    "base64",
  );

  const Key = `insurances/${Date.now().toString()}.jpg`;

  const params = {
    Bucket: "drivers-hub",
    Key,
    Body: base64Data,
    ContentEncoding: "base64",
    ContentType: `image/jpeg`,
  };

  try {
    await s3Client.upload(params).promise();
    return Key;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const getImageFromS3 = async (
  bucket: string,
  key: string,
): Promise<string> => {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  try {
    const data = await s3Client.getObject(params).promise();
    const buffer = data.Body as Buffer;
    return buffer.toString("base64");
  } catch (err) {
    console.error("Failed to retrieve file from S3", err);
    throw err;
  }
};
