const mongoose = require('mongoose');

const quizAnalyticsSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quizSchema', // Assuming 'Quiz' is the name of the schema you're referencing
    required: true
  },
  totalViews: {
    type: Number,
    default: 0
  },
  questionsViews: [
    {
      qNumber: {
        type: Number,
        required: true
      },
      views: {
        type: Number,
        default: 0
      }
    }
  ]
});

const QuizAnalytics = mongoose.model('QuizAnalytics', quizAnalyticsSchema);

module.exports = QuizAnalytics;
