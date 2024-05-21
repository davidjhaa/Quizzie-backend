const Quiz = require("../models/quizModel");

const getQuiz = async (req, res, next) => {
    try {
      const quizId = req.params.id;
      const quizDetails = await Quiz.findById(quizId);

      if (!quizDetails) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      res.json(quizDetails);
    } 
    catch (error) {
        next("error");
    }
};

module.exports = {
  getQuiz,
}

