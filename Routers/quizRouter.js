const express = require("express");
const quizRouter = express.Router();
const {getQuiz, createQuiz, deleteQuiz, getQuizStats, postOptionSelected} = require("../controller/quizController")
const verifyToken = require ('../middlewares/verifyAuth')

quizRouter
    .route('/createQuiz')
    .post(verifyToken,createQuiz)

quizRouter
    .route('/deleteQuiz/:id')
    .post(verifyToken,deleteQuiz)

quizRouter
    .route('/stats')
    .get(verifyToken, getQuizStats)

quizRouter
    .route('/analytics')
    .get(verifyToken, getQuizStats)


quizRouter
    .route('/:id')
    .get(getQuiz)
    .post(postOptionSelected)

module.exports = quizRouter;