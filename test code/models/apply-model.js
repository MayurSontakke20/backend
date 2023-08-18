import mongoose from "mongoose"
const Schema = mongoose.Schema;

const apply = new Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: Number },
  service: { type: String },
  experience: { type: Number },
  jobPosition: { type: String },
  resume: { type: String }
});

export default mongoose.model("apply", apply);