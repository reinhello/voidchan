import { Schema, model } from "mongoose";

export interface IProfile {
  admin: boolean;
  authKey: string;
  date: Date;
  email: string;
  name: string;
}

const profileSchema = new Schema<IProfile>({
  admin: {
    type: Schema.Types.Boolean,
    default: false,
    required: true,
  },
  authKey: {
    type: Schema.Types.String,
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    default: new Date(),
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
});

export const Profile = model<IProfile>("profile", profileSchema);
