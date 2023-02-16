import { Files } from "../../database/models/files.model";
import { IProfile, Profile } from "~~/server/database/models/profile.model";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event) as any;
  const profile = await Profile.findOne({ email: session?.user?.email }) as IProfile;
  const file = getRouterParam(event, "file") as string;

  if (profile.admin) {
    await Files.findOneAndDelete({ id: file });
  }
});
