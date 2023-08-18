import express from "express";
import feedbackModel from "../models/feedback-model";
import { sendEmail } from "./send-mail";


export const uploadFeedback = express.Router();

uploadFeedback.post("/feedback", async (request, response) => {

    try {
        const name = request.body.name;
        const email = request.body.email;
        const rating = request.body.rating;
        const message = request.body.message;


        // validations
        if ((name === null || name === undefined || name === "") || (email === null || email === undefined || email === "") || (rating === null || rating === undefined || rating === "") || (message === null || message === undefined || message === "")) {
            response.status(200).json({
                status: "VALIDATION_FAILED",
                message: "Please enter all fields"
            });
            return;
        }

        const addToDatabase = new feedbackModel({
            name,
            email,
            rating,
            message
        });

        //save data to database
        const databaseResult = await addToDatabase.save();

        //send mail on HR email
        const isEmailSend = await sendEmail("User Rating", name, email, rating, message)
        if (databaseResult && isEmailSend) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Thanks for Giving Feedback"
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "failed to Upload feedback. Please try again."
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