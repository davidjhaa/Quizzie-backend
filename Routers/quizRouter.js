const express = require("express");
const quizRouter = express.Router();
const {getQuiz} = require("../controller/quizController")

quizRouter
    .route('/:id')
    .get(getQuiz)


module.exports = quizRouter;