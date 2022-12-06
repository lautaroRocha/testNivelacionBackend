const multer = require('multer');
const path = require('path')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `product-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: PNG and WEBp Only!');
    }
}

const uploadMulter = multer({
    storage: multerStorage,
    filter : fileFilter
});

module.exports = uploadMulter;