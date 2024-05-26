const express = require("express");
const userRouter = express.Router();
const { registerUser, loginUser } = require("../controller/userController");

userRouter
    .route('/signUp')
    .post(registerUser)

userRouter
    .route('/login')
    .post(loginUser)


module.exports = userRouter;
