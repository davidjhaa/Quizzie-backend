const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./Routers/userRouter");
const quizRouter = require("./Routers/quizRouter");


require('dotenv').config()

const db_link = process.env.MONGODB_URI;

const app = express();

app.use(cors()) ;
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Express on Vercel"));

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

app.use("/user", userRouter);
app.use("/quiz", quizRouter);
