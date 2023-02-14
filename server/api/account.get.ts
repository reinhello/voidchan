import { Profile, IProfile } from "../database/models/profile.model";
import { generateString } from "~~/utils/generateString";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    return {
      code: 403,
      message: "Not Allowed",
    }
  } else {
    const profile = await Profile.findOne({ email: session?.user?.email });

    if (!profile) {
      const authKey = generateString(32);

      Profile.create({
        admin: false,
        authKey,
        date: new Date(),
        email: session?.user?.email,
        name: session?.user?.name,
      });
    } else return { message: "Account Fetched!", expires: session.expires };
  }

});
