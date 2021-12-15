import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
    images: Array,
    title: String,
    price: Number,
    description: String,
});

const modelName = 'Ad';

export default mongoose.connection && mongoose.connection.models[modelName] ? mongoose.connection.models[modelName] : mongoose.model(modelName, modelSchema);
