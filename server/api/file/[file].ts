import { Files, IFiles } from "~~/server/database/models/files.model";
import mime from "mime";

export default defineEventHandler(async (event) => {
  const fileID = getRouterParam(event, "file") as string;
  const file = await Files.findOne({ id: fileID }) as IFiles;

  if (!file) {
    return {
      code: 404,
      message: "Unknown File"
    }
  }
  return {
    id: file.id,
    date: file.date,
    ext: mime.getExtension(file.mimetype),
    uploader: file.uploader.name,
  };
});
