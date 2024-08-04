import { Hono } from "hono";
import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";

const upload = new Hono();

async function uploadToTmpContainer(
  content: ArrayBuffer,
  fileName: string,
  contentType: string
) {
  const blobServiceClient = new BlobServiceClient(
    process.env.AZURE_STORAGE_CONNECTION_STRING ?? ""
  );
  const tmpContainerName = "newcontainer1722024443750tmp";
  const containerClient =
    blobServiceClient.getContainerClient(tmpContainerName);
  const blobName = fileName;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadData(content, {
    blobHTTPHeaders: {
      blobContentType: contentType,
    },
  });

  //   console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse);
  return `https://localtest.blob.core.windows.net/${tmpContainerName}/${fileName}`;
}

upload.post("/", async (c) => {
  try {
    const body = await c.req.parseBody();
    const content = body["image"];
    if (content instanceof File) {
      const buffer = await content.arrayBuffer();
      const ext = path.extname(content.name);
      const fileName = "image_" + Date.now() + ext;
      const url = await uploadToTmpContainer(buffer, fileName, content.type);
      return c.json({ message: "Image uploaded successfully", url }, 200);
    } else throw "No image found";
  } catch (error) {
    console.error(error);
    return c.json(
      { message: error instanceof String ? error : "Failed to upload image" },
      400
    );
  }
});

export default upload;
