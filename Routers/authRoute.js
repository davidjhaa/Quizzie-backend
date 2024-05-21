const express = require("express");
const userRouter = express.Router();
const { registerUser, loginUser, createQuiz } = require("../controller/userController");
const verifyToken = require("../middlewares/verifyAuth")

userRouter
    .route('/signUp')
    .post(registerUser)

userRouter
    .route('/login')
    .post(loginUser)

userRouter.use(verifyToken)
userRouter
    .route('/createQuiz')
    .post(createQuiz)

module.exports = userRouter;
