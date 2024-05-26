const Quiz = require('../models/quizModel'); 

const countAPICallsAndUpdateAnalytics = async (req, res, next) => {
  try {
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    quiz.totalViews += 1;
    console.log(quiz.totalViews)
    await quiz.save();
    
    next();
  } 
  catch (error) {
    console.error('Error updating API analytics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    countAPICallsAndUpdateAnalytics
  };