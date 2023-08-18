import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import schedule from "node-schedule";
import { uploadFeedback } from "./form/feedback-form";
import { uploadReachToUs } from "./form/reach-to-us-form";
import { applyForJob } from "./form/join-us-form";
import { subscribe } from "./form/subscribe";
import { applyForRole } from "./form/apply-form";
import { uploadService } from './form/service-form';
import { uploadContact } from './form/contact-form';
import { monthlyJobScheduler } from "./Jobs/monthly-entry.job";

dotenv.config();



const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});

//routes 
app.use("/", uploadFeedback);
app.use("/", applyForJob);
app.use("/", uploadReachToUs);
app.use("/", subscribe);
app.use("/", applyForRole);
app.use("/", uploadService);
app.use("/", uploadContact); //


app.get('/', function (req, res) {
    res.json("Welcome to AIITS Backend");
});


mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}...`);
        });
        let rule = new schedule.RecurrenceRule();
        rule.hour = 1;
        rule.minute = 0;
        rule.second = 10;

        const job = schedule.scheduleJob(rule, function () {
            monthlyJobScheduler();
        });
    })
    .catch((err) => {
        console.log("database not connected")
    });





