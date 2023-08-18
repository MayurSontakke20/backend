import mongoose from "mongoose"
const Schema = mongoose.Schema;

const reachToUs = new Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    message: { type: String }

});

export default mongoose.model("reachToUs", reachToUs);