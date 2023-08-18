import express from "express";
import contact from "../models/contact";
import { sendEmail } from "./send-mail";


export const uploadContact = express.Router();

uploadContact.post("/contact", async (request, response) => {

  try {
    const name = request.body.name;
    const email = request.body.email;
    const message = request.body.message;


    // validations
    if ((name === null || name === undefined || name === "") || (email === null || email === undefined || email === "") || (message === null || message === undefined || message === "")) {
      response.status(200).json({
        status: "VALIDATION_FAILED",
        message: "Please enter all fields"
      });
      return;
    }

    const addToDatabase = new contact({
      name,
      email,
      message
    });

    //save data to database
    const databaseResult = await addToDatabase.save();

    //send mail on HR email
    const isEmailSend = await sendEmail("contact us", name, email, "", message)
    if (databaseResult && isEmailSend) {
      response.status(200).json({
        status: "SUCCESS",
        message: "We will get back to you soon."
      });
      return;
    } else {
      response.status(200).json({
        status: "FAILED",
        message: "Required failed. Please try again."
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