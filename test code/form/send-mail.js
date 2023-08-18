import sgMail from "@sendgrid/mail";
import express from "express";

export function sendEmail(emailSubject, name, email, mobile, message, formType) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    try {
        let msg;
        if ("User Details" === emailSubject && formType === "lowPriceWebsite") {
            msg = {
                to: "info@allindianitservices.com",
                from: process.env.FROM_MAIL,
                subject: `Query regrading customize website`,
                html: `<h1>Name of User : ${name}</h1><br /><h2>User Email: ${email}</h2><br /><h2>Mobile No : ${mobile}</h2><br /><h2>User Entered message: ${message}</h2>`
            }
        } else if ("User Details" === emailSubject && formType === "account") {
            msg = {
                to: "info@allindianitservices.com",
                from: process.env.FROM_MAIL,
                subject: `Query regrading account software`,
                html: `<h1>Name of User : ${name}</h1><br /><h2>User Email: ${email}</h2><br /><h2>Mobile No : ${mobile}</h2><br /><h2>User Entered message: ${message}</h2>`
            }
        } else if ("User Details" === emailSubject) {
            msg = {
                to: "info@allindianitservices.com",
                from: process.env.FROM_MAIL,
                subject: emailSubject,
                html: `<h1>Name of User : ${name}</h1><br /><h2>User Email: ${email}</h2><br /><h2>Mobile No : ${mobile}</h2><br /><h2>User Entered message: ${message}</h2>`
            }
        } else {
            msg = {
                to: "info@allindianitservices.com",
                from: process.env.FROM_MAIL,
                subject: emailSubject,
                html: `<h1>Name of User : ${name}</h1><br /><h2>User Email: ${email}</h2><br /><h2>Rating: ${mobile}</h2><br /><h2>User Entered message: ${message}</h2>`
            }
        }

        return new Promise((resolve, reject) => {
            sgMail
                .send(msg)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(false);
                });
        })
    } catch (error) {
        return false;
    }
}