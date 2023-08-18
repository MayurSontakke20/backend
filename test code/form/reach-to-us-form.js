import express from "express";
import reachToUs from "../models/reachToUs-model";
import { sendEmail } from "./send-mail";


export const uploadReachToUs = express.Router();

uploadReachToUs.post("/reach-to-us", async (request, response) => {

    try {
        const name = request.body.name;
        const email = request.body.email;
        const mobile = request.body.mobile;
        const message = request.body.message;

        // validations
        if ((name === null || name === undefined || name === "") || (email === null || email === undefined || email === "") || (mobile === null || mobile === undefined || mobile === "") || (message === null || message === undefined || message === "")) {
            response.status(200).json({
                status: "VALIDATION_FAILED",
                message: "Please enter all fields"
            });
            return;
        }

        const addToDatabase = new reachToUs({
            name,
            email,
            mobile,
            message
        });

        //save data to database
        const databaseResult = await addToDatabase.save();

        const formType = request.body.formType;


        //send mail on HR email
        const isEmailSend = await sendEmail("User Details", name, email, mobile, message, formType)
        if (databaseResult && isEmailSend) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Your query send Successfully"
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "failed contact. Please try again."
            });
            return;
        }
    } catch (error) {
        response.status(200).json({
            status: "FAILED",
            message: error.message
        });
        return;
    }

});