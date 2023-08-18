import subscribeModel from "../models/subscribe-model";


export const monthlyJobScheduler = async () => {
    try {
        const email = "dummy@email.com";
        //add one entry in db 
        const result = await subscribeModel.create({ email: email });
        console.log("entry added", result);

        //delete the inserted record
        const isRecordDeleted = await subscribeModel.deleteOne({ email: email });
        console.log("entry deleted", isRecordDeleted)
    } catch (error) {
        console.log("error", error.message)
    }
}