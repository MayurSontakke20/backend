import mongoose from "mongoose"
const Schema = mongoose.Schema;

const service = new Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  service: { type: String },
  message: { type: String }
});

export default mongoose.model("service", service);