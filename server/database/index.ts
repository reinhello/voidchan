import mongoose from "mongoose";

const config = useRuntimeConfig();

export default async () => {
  mongoose.set("strictQuery", false);

  await mongoose
  .connect(config.MongoDB)
  .then(() => console.info("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
}
