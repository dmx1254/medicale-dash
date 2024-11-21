const mongoose = require("mongoose");
const Pusher = require("pusher");

const globalWithMongoose = global as typeof global & {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

export const connectDB = async (): Promise<string> => {
  if (cached.conn) {
    return "Already connected to database";
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.DB_CONNECT)
      .then((mongoose: string) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return "Connected to database with success";
};

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
});
