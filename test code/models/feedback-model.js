import mongoose from "mongoose"
const Schema = mongoose.Schema;

const feedbackModel = new Schema({
    name: { type: String },
    email: { type: String },
    rating: { type: Number },
    message: { type: String }

});

export default mongoose.model("feedback", feedbackModel);