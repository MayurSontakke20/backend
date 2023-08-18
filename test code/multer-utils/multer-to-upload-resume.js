import multer from "multer";

import fs from "fs";

import { MULTER_UPLOAD_SIZE_LIMIT, multerFileTypeFilterForPdfJpgAndJpeg } from './multer-utils';


var assign = multer.diskStorage({
    destination: function (req, file, cb) {
        const email = req.headers['email'];

        const dir = `./public/resume/${email}/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        try {
            const documentName = file.originalname.replace(" ", "-");
            const fileLocation = documentName;
            cb(null, fileLocation);
        } catch (error) {

        }
    }
});

export const documentUpload = multer({ storage: assign, limits: { fileSize: MULTER_UPLOAD_SIZE_LIMIT, files: 1 }, fileFilter: multerFileTypeFilterForPdfJpgAndJpeg });