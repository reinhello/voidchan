import mime from "mime";
import { Files, IFiles } from "~~/server/database/models/files.model";

export default defineEventHandler(async (event) => {
  const fileID = getRouterParam(event, "file") as string;
  const file = await Files.findOne({ id: fileID.split(".")[0] }) as IFiles;

  if (!file) {
    return {
      code: 404,
      message: "Unknown File"
    }
  }

  const mimeType = mime.getExtension(file.mimetype);
  const fileName = `${fileID.split(".")[0]}.${mimeType}`;

  if (fileID !== fileName) {
    return {
      code: 404,
      message: "File Not Found"
    }
  }

  const data = Buffer.from(file.buffer, "base64");

  event.node.res.setHeader("Content-Type", file.mimetype);
  return send(event, data);
});
