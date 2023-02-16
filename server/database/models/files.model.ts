import { Schema, model } from "mongoose";
import { IProfile } from "./profile.model";

export interface IFiles {
  id: string;
  date: Date;
  buffer: string;
  mimetype: string;
  uploader: IProfile;
}

const filesSchema = new Schema<IFiles>({
  id: {
    type: Schema.Types.String,
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    default: new Date(),
    required: true,
  },
  buffer: {
    type: Schema.Types.String,
    required: true,
  },
  mimetype: {
    type: Schema.Types.String,
    required: true,
  },
  uploader: {
    admin: {
      type: Schema.Types.Boolean,
      required: true,
    },
    authKey: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
  },
});

export const Files = model<IFiles>("files", filesSchema);
