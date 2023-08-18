import express from "express";
import joinUsModel from "../models/joinUs-model";
import { documentUpload } from "../multer-utils/multer-to-upload-resume";
import { runMiddleware } from "../multer-utils/multer-utils";
import { sendResumeToHR } from "./send-resume-on-hr-mail";


export const applyForJob = express.Router();

applyForJob.post("/apply", async (request, response) => {
    try {
        const name = request.headers["name"];
        const email = request.headers["email"];
        const mobile = Number(request.headers["mobile"]);
        const experience = request.headers["experience"];
        const jobPosition = request.headers["jobposition"];


        // validations
        if ((name === null || name === undefined || name === "") || (email === null || email === undefined || email === "") || (mobile === null || mobile === undefined || mobile === "") || (experience === null || experience === undefined || experience === "") || (jobPosition === null || jobPosition === undefined || jobPosition === "")) {
            response.status(200).json({
                status: "VALIDATION_FAILED",
                message: "Please enter all fields"
            });
            return;
        }

        if (mobile.toString().length !== 10) {
            response.status(200).json({
                status: "VALIDATION_FAILED",
                message: "Please Enter 10 digit mobile no"
            });
            return;
        }

        let filteredUrl;
        await runMiddleware(request, response, documentUpload.single("resume"))
        const uploadedFile = request.file;
        if (!!uploadedFile) {
            filteredUrl = uploadedFile.destination + uploadedFile.filename;

        }

        const addToDatabase = new joinUsModel({
            name,
            email,
            mobile,
            experience,
            jobPosition,
            resume: filteredUrl
        });

        //save data to database
        const databaseResult = await addToDatabase.save();

        //send resume & details on HR mail
        const isMailSend = await sendResumeToHR(name, email, mobile, experience, jobPosition, filteredUrl)

        if (databaseResult && isMailSend) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Apply Successfully"
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "failed Apply. Please try again."
            });
            return;
        }
    } catch (error) {
        response.json({
            status: "FAILED",
            message: error.message
        });
        return;
    }

});