const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'upload/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fieldsWithTypes = {
    book: ['application/epub+zip', 'application/pdf', 'application/fb2'],
    images: ['image/png', 'image/jpg', 'image/jpeg']
}

const fileFilter = (req, file, cb) => {
    const types = fieldsWithTypes[file.fieldname];
    if (types && types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }

};


module.exports = multer({storage, fileFilter});
