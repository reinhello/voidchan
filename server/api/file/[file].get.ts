import { Files, IFiles } from "~~/server/database/models/files.model";
import { IProfile, Profile } from "~~/server/database/models/profile.model";
import mime from "mime";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const fileID = getRouterParam(event, "file") as string;
  const file = await Files.findOne({ id: fileID }) as IFiles;
  const session = await getServerSession(event) as any;

  if (!file) {
    return {
      code: 404,
      message: "Unknown File"
    }
  }

  if (!session) {
    return {
      id: file.id,
      date: file.date,
      ext: mime.getExtension(file.mimetype),
      uploader: {
        name: file.uploader.name,
      },
    };
  } else {
    const profile = await Profile.findOne({ email: session.user.email }) as IProfile;

    return {
      id: file.id,
      date: file.date,
      ext: mime.getExtension(file.mimetype),
      uploader: {
        admin: profile.admin,
        name: file.uploader.name,
      },
    };
  }

});
