import express from "express";
import service from "../models/service-model";
import { sendEmail } from "./send-mail";


export const uploadService = express.Router();

uploadService.post("/serviceForm", async (request, response) => {

  try {
    const name = request.body.name;
    const email = request.body.email;
    const mobile = request.body.mobile;
    const serviceName = request.body.service;
    const message = request.body.message;

    // validations
    if (!!name === false && !!email === false && !!mobile === false && !!serviceName === false && !!message === false) {
      response.status(200).json({
        status: "VALIDATION_FAILED",
        message: "Please enter all fields"
      });
      return;
    }
    else {
      const addToDatabase = new service({
        name,
        email,
        mobile,
        serviceName,
        message
      });

      //save data to database
      const databaseResult = await addToDatabase.save();

      //send mail on HR email
      const isEmailSend = await sendEmail("service", name, email, mobile, { serviceName, message })
      if (databaseResult && isEmailSend) {
        response.status(200).json({
          status: "SUCCESS",
          message: "We will get back to you soon"
        });
        return;
      } else {
        response.status(200).json({
          status: "FAILED",
          message: "Request failed. Please try again."
        });
        return;
      }
    }

  } catch (error) {
    response.status(200).json({
      status: "FAILED",
      message: error.message
    });
    return;
  }

});