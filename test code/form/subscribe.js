import express from "express";
import SubscribeUser from "../models/subscribe-model";

export const subscribe = express.Router();

subscribe.post("/subscribe", async (request, response) => {

    try {

        const email = request.body.email;

        // validations
        if (email === null || email === undefined || email === "") {
            response.status(200).json({
                status: "VALIDATION_FAILED",
                message: "Please enter Email"
            });
            return;
        }

        //check user already subscribe or not
        const isUserExist = await SubscribeUser.findOne({ email: email });
        if (isUserExist) {
            response.status(200).json({
                status: "FAILED",
                message: "You already have been Subscribed."
            });
            return;
        }

        const addToDatabase = new SubscribeUser({
            email,
        });

        //save data to database
        const databaseResult = await addToDatabase.save();

        if (databaseResult) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Thanks for Subscribe"
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "failed to Subscribe. Please try again."
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