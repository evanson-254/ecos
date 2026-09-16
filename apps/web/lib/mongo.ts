import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://ameliaperker110_db_user:XOHxBQ3cyuIBkCcT@cluster0.zn0ghdl.mongodb.net/eco?appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
}


