import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv';
import fs from 'fs/promises';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendCvToHR = async (name, email, mobile, service, experience, jobPosition, attachmentFileUrl) => {

  const attachmentFilePath = `${attachmentFileUrl}`;

  //convert file into base64
  const base64String = (await fs.readFile(attachmentFilePath)).toString("base64");
  try {
    const msg = {
      to: "hr@allindianitservices.com",
      from: process.env.FROM_MAIL,
      subject: 'Application For Your recruitment',
      html: `<h2>Name : ${name}</h2><br /><h2>Email:${email}</h2><br /><h2>Contact NO:${mobile}</h2><br /><h2>service :${service}</h2><br /><h2>Experience :${experience} year</h2><br /><h2>Apply for Job position:${jobPosition}</h2>`,
      attachments: [                          //sending resume  attachment to hr email 
        {
          content: base64String,
          filename: "resume.pdf",
          type: "application/pdf",
          disposition: "attachment"
        }
      ]
    }

    return new Promise((resolve, reject) => {
      sgMail
        .send(msg)
        .then((data) => {
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