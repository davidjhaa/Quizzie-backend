const express = require("express");
const quizRouter = express.Router();
const {getQuiz, createQuiz, getQuizStats} = require("../controller/quizController")
const {countAPICallsAndUpdateAnalytics } = require('../controller/analyticsController')
const verifyToken = require ('../middlewares/verifyAuth')

quizRouter
    .route('/:id')
    .get(countAPICallsAndUpdateAnalytics, getQuiz)

quizRouter.use(verifyToken)
quizRouter
    .route('/stats')
    .get(getQuizStats)

quizRouter
    .route('/createQuiz')
    .post(createQuiz)

module.exports = quizRouter;