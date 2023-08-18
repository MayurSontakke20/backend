import mongoose from "mongoose"
const Schema = mongoose.Schema;

const joinUs = new Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    experince: { type: Number },
    jobPosition: { type: String },
    resume: { type: String }

});

export default mongoose.model("joinUs", joinUs);