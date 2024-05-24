const express = require("express");
const quizRouter = express.Router();
const {getQuiz, createQuiz, getQuizStats} = require("../controller/quizController")
const {countAPICallsAndUpdateAnalytics } = require('../controller/analyticsController')
const verifyAuth = require ('../middlewares/verifyAuth')

quizRouter
    .route('/number')
    .get(getQuizStats)


quizRouter
    .route('/:id')
    .get(countAPICallsAndUpdateAnalytics, getQuiz)

quizRouter.use(verifyAuth)
quizRouter
    .route('/createQuiz')
    .post(createQuiz)

module.exports = quizRouter;