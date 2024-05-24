const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./Routers/authRoute");
const quizRouter = require("./Routers/quizRouter");
const Quiz = require('./models/quizModel');
const QuizAnalytics = require('./models/analyticsModel');


require('dotenv').config()

const db_link = process.env.MONGODB_URI;

const app = express();

app.use(cors()) ;
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

mongoose
    .connect(db_link)
    .then(function (db) {
    console.log("MongoDB connected successfully");
    })
    .catch(function (err) {
        console.log("Error connecting to MongoDB:", err);
});

app.use("/api/v1/auth", userRouter);
app.use("/quiz", quizRouter);


// // Create a new quiz with the timer field omitted
// const dummyQuiz = new Quiz ({
//   quizName: "Dummy Quiz",
//   quizType: "Q&A",
//   optionType: "text+image",
//   timer: 60, // 60 seconds
//   questions: [
//     {
//       qNumber: 1,
//       qName: "What is the capital of France?",
//       options: [
//         "Parisdaviddata:image/jpeg;base64,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",
//         "Berlindaviddata:image/jpeg;base64,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",
//         "Romedavidhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8BBUP2g53EZouPBjOBtFazpQfhhYLApzcAQ&s",
//         "Italydaviddata:image/jpeg;base64,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"
//       ],
//       correctOption: "Paris"
//     },
//   ],
//   refUserId: "6648bc840dd4514e9212df46" 
// });


// dummyQuiz.save().then(quiz => {
//   console.log("Quiz saved successfully:", quiz);
// }).catch(err => {
//   console.error("Error saving quiz:", err);
// });


// const createDummyData = new QuizAnalytics ({
//     quizId: '6648bd7796aecb0a25cb2164',
//     totalViews: 100, 
//     questionsViews: [
//       { qNumber: 1, views: 50 }, 
//       { qNumber: 2, views: 30 },
//       { qNumber: 3, views: 20 },
//     ],
//   })

// createDummyData.save().then(quiz => {
//     console.log("QuizAnalytics saved successfully:", quiz);
//   }).catch(err => {
//     console.error("Error saving quizAnalysis:", err);
//   });