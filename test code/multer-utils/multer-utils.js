
export const MULTER_UPLOAD_SIZE_LIMIT = 2000000;

export function multerFileTypeFilterForPdfJpgAndJpeg(req, file, cb) {

    if (file.mimetype === "application/pdf" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {

        // check for extension also
        const extension = file.originalname.split('.').pop(); // this will give last element

        // check for if extension allowed
        if (["pdf", "jpeg", "jpg", "png"].includes(extension)) {
            cb(null, true);
        } else {
            cb({ code: "JPEG_PNG_PDF" }, false);
        }
    } else {
        cb({ code: "JPEG_PNG_PDF" }, false);
    }
}

export function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}
