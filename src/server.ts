import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database connect success");
    app.listen(config.port, () => {
      console.log(`Server connect success ${config.port}`);
    });
  } catch (error) {
    console.log("Database not connect");
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();
