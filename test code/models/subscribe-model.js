import mongoose from "mongoose"
const Schema = mongoose.Schema;

const subscribeUser = new Schema({
    email: { type: String },
});

export default mongoose.model("subscribeUser", subscribeUser);