// utils/uploadToCloudinary.js
const { Readable } = require('stream');
const cloudinary = require('../utils/cloudinary.js'); // Make sure you have configured cloudinaryConfig.js

/**
 * Uploads a file to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer
 * @param {String} folder - The Cloudinary folder to upload to
 * @returns {Promise<Object>} - The Cloudinary upload result
 */
async function uploadToCloudinary(fileBuffer, folder) {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        bufferStream.pipe(uploadStream);
    });
}

module.exports = uploadToCloudinary;
