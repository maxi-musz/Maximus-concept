const cloudinary = require('cloudinary');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

const handleUploadPic = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log("Error uploading files...".red)
            return res.status(500).send('Error uploading file');
        }

        const file = req.file;
        if (!file) {
            console.log("No file provided...".red)
            return res.status(400).send('No file provided');
        }

        try {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload_stream(
                {
                    folder: 'profile-image', // Specify the folder in Cloudinary
                    public_id: `${Date.now()}_${file.originalname}`,
                },
                (error, result) => {
                    if (error) {
                        console.log("Error: ", error)
                        return res.status(500).send(error);
                    }

                    console.log(`Image succesfully uploaded, image secure url: ${result.secure_url}`)
                    res.status(200).json({
                        url: result.secure_url, // Cloudinary URL
                        public_id: result.public_id,
                    });
                }
            );

            // Write the file buffer to the stream
            const stream = result;
            stream.end(file.buffer);
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error.message);
        }
    });
};

module.exports = handleUploadPic;
