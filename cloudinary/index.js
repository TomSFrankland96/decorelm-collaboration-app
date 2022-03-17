const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_KEY,
    // api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name: "decorelm",
    api_key: "581167199235883",
    api_secret: "0KgbdtYKoqyilmvX02nRYP_j9yQ",
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Decorelm Collaboration Application',
    }
});

module.exports = {
    cloudinary,
    storage
}