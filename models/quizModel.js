const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
    questionNumber : {
        type: Number,
        required : true,
    },
    questionText: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctOption: {
        type: String,
        required: true,
    }
}, {
    _id: false 
});


const quizSchema = new Schema(
    {
        totalViews: {
            type: Number,
            default: 0,
        },
        quizName: {
            type: String,
            required: true,
        },
        quizType: {
            type: String,
            required: true,
            enum: ["Q&A", "poll"],
        },
        optionType : {
            type: String,
            enum: ["Text", "Image", "Text+Image"], 
            default: "text", 
            required: true,
        },
        timer: {
            type: Number,
            default : 0,
        },
        questions: {
            type: [questionSchema],
            required: true
        },
        refUserId: {
            type: mongoose.ObjectId,
            required: true
        }
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Quiz", quizSchema);