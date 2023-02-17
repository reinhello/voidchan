import { Files, IFiles } from "~~/server/database/models/files.model";

export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, "file") as string;
  const files = await Files.findOne({ id: file.split(".")[0] }) as IFiles;

  if (files) {
    const image = Buffer.from(files.buffer, "base64");

    event.node.res.setHeader("Content-Disposition", `attachment;filename="${file}"`);
    return send(event, image);
  } else {
    return {
      code: 404,
      message: "File Not Found"
    }
  }
});
