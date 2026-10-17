import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Now looking for MONGODB_URI instead of MONGO_URI
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;