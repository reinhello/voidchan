import { generateString } from "~~/utils/generateString";
import { Files, IFiles } from "../database/models/files.model";
import { Profile, IProfile } from "../database/models/profile.model";
import useFiles from "~~/utils/useFiles";
import mime from "mime";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, "Authorisation");
  const profile = await Profile.findOne({ authKey: auth }) as IProfile;
  const { files } = await useFiles(event);

  if (!profile) {
    event.node.res.statusCode = 401;
    event.node.res.setHeader("Content-Type", "text/plain");
    return event.node.res.statusMessage = "You are not authorised to use this endpoint";
  }

  const name = generateString(5);
  const mimeType = mime.getExtension(files[0].mimetype);

  await Files.create({
    id: name,
    date: new Date(),
    buffer: files[0].buffer.toString("base64"),
    mimetype: files[0].mimetype,
    nsfw: false,
    uploader: {
      admin: profile.admin,
      authKey: profile.authKey,
      name: profile.name,
      email: profile.email,
    },
  } as IFiles);

  event.node.res.setHeader("Content-Type", "application/json");

  return {
    code: 200,
    url: `${config.BaseURL}/v/${name}.${mimeType}`,
  }
});
