import mongoose from "mongoose"
const Schema = mongoose.Schema;

const contact = new Schema({
  name: { type: String },
  email: { type: String },
  message: { type: String }
});

export default mongoose.model("contact", contact);