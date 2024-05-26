const express = require("express");
const quizRouter = express.Router();
const {getQuiz, createQuiz, getQuizStats} = require("../controller/quizController")
const {countAPICallsAndUpdateAnalytics } = require('../controller/analyticsController')
const verifyToken = require ('../middlewares/verifyAuth')

quizRouter
    .route('/stats')
    .get(verifyToken, getQuizStats)

quizRouter
    .route('/createQuiz')
    .post(verifyToken,createQuiz)

quizRouter
    .route('/:id')
    .get(countAPICallsAndUpdateAnalytics, getQuiz)

module.exports = quizRouter;