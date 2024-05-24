const QuizAnalytics = require('../models/analyticsModel'); // Import your QuizAnalytics model

const countAPICallsAndUpdateAnalytics = async (req, res, next) => {
  try {
    const quizId = req.params.quizId || req.body.quizId; // Adjust as per your API route

    // Update totalViews count
    await QuizAnalytics.updateOne({ quizId }, { $inc: { totalViews: 1 } }, { upsert: true });

    // If you want to track views per question, you can do it similarly
    // For example, if the question number is provided in the request body
    const qNumber = req.body.qNumber;
    if (qNumber) {
      await QuizAnalytics.updateOne(
        { quizId, 'questionsViews.qNumber': qNumber },
        { $inc: { 'questionsViews.$.views': 1 } },
        { upsert: true }
      );
    }

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error updating API analytics:', error);
    // You can choose to handle errors differently, e.g., send a 500 response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    countAPICallsAndUpdateAnalytics
  };