import mongoose, { ConnectOptions } from "mongoose";

const connectdb = () => {
  mongoose.connect(
    process.env.DB_URL as string,
    {
      useNewUrlParser: true,
    } as ConnectOptions
  );

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Mongodb connected successfully");
  });
};

export { connectdb };
