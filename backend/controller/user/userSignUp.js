const cloudinary = require("../../utils/cloudinary");
const validator = require("validator");
const User = require("../../models/userModel");
const uploadToCloudinary = require("../../utils/uploadToCloudinary.js");


async function userSignUpController(req, res) {
    console.log("Registering new user...");

    try {
        // Destructure and trim input fields
        let {
            firstName = '',
            lastName = '',
            email = '',
            password = '',
        } = req.body;

        console.log(firstName, lastName, email, password);
    
        // Trim and sanitize input fields
        firstName = validator.escape(firstName.replace(/\s+/g, ' ').trim());
        lastName = validator.escape(lastName.replace(/\s+/g, ' ').trim());
        email = validator.escape(email.trim().toLowerCase());
        password = validator.escape(password.trim());
    
        // Check for required fields
        if (!firstName || !lastName || !email || !password) {
            console.log('All fields are required'.red);
            return res.status(400).json({ 
                error: true,
                message: 'All fields are required.'
            });
        }
    
        // Validate email format
        if (!validator.isEmail(email)) {
            console.log('Invalid email format'.red);
            return res.status(400).json({ error: 'Invalid email format.' });
        }
    
        // Check for existing user by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User registration failed, user already exists".red);
            return res.status(400).json({ 
                error: true,
                message: 'Email already in use.' 
            });
        }

        if (req.file) {
            console.log("Uploading file to Cloudinary...");

            try {
                const result = await uploadToCloudinary(req.file.buffer, 'user_profiles');
                profilePic = result.secure_url;
            } catch (error) {
                console.error("Error uploading to Cloudinary: ", error);
                return res.status(500).json({ error: 'Error uploading profile picture.' });
            }
            console.log("File uploaded to Cloudinary: ", profilePic);
        } else {
            console.log('No profile picture uploaded'.yellow);
        }
    
        // Create and save new user
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            profilePic
        });
        await user.save();
    
        console.log("User successfully created".magenta);
        res.status(201).json({
            data: user,
            success: true,
            message: "User created successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

module.exports = userSignUpController