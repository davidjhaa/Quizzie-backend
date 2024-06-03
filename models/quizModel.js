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
    options:  {
        type: [{
            option: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                default: 0
            }
        }],
        required: true,
    },
    correctOption: {
        type: String,
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
            enum: ["Q&A", "Poll"],
        },
        optionType : {
            type: String,
            enum: ["Text", "Image", "Text+Image"], 
            default: "Text", 
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