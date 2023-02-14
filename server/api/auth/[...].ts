import DiscordProvider from "next-auth/providers/discord";
/* @ts-ignore */
import { NuxtAuthHandler } from "#auth";

const config = useRuntimeConfig();
const scopes = ["identify", "email"].join(" ");

export default NuxtAuthHandler({
  secret: "testinglololol",
  providers: [
    /* @ts-ignore */
    DiscordProvider.default({
      authorization: {
        params: {
          scope: scopes
        }
      },
      clientId: config.ClientID,
      clientSecret: config.ClientSecret,
    })
  ]
});
