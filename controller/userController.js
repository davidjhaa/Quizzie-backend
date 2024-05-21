const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
    try {
        const { name, password, email } = req.body;
        const formattedEmail = email.toLowerCase();
        if (!name || !email || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }


        const isExistingUser = await User.findOne({ email: formattedEmail });
        if (isExistingUser) {
            return res
                .status(409)
                .json({ errorMessage: "Account with this mail already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email: formattedEmail,
            password: hashedPassword,
        });

        await userData.save();

        res.status(200).json({
            message: "User registered successfully",
        });
    } 
    catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        const formattedEmail = email.toLowerCase();

        const userDetails = await User.findOne({ email: formattedEmail });
        if (!userDetails) {
            return res
                .status(409)
                .json({ errorMessage: "User doesn't exist" });
        }

        const isPasswordMatched = await bcrypt.compare( password, userDetails.password );

        if (!isPasswordMatched) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: userDetails._id },
            process.env.SECRET_KEY,
            { expiresIn: "60h" }
        );

        res.status(200).json({
            message: "loggedIn Successfully",
            token: token,
            userId: userDetails._id,
        });
    } 
    catch (error) {
        next("error");
    }
};

const createQuiz = async (req, res) => {

}

module.exports = {
    registerUser,
    loginUser,
    createQuiz,
};
