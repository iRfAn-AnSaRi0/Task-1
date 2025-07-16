import mongoose from "mongoose";

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Db connected');

    } catch (error) {
        console.log("error", error);
    }
}

export { dbconnection }