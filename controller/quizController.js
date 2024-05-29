const Quiz = require("../models/quizModel");

const createQuiz = async (req, res) => {
  try {
    const { Questions, optionType, quizName, quizType } = req.body;

    const newQuiz = new Quiz({
      quizName: quizName,
      quizType: quizType,
      optionType: optionType,
      questions: Questions,
      refUserId: req.userId,
    });

    await newQuiz.save();

    const baseUrl = "http://localhost:3001";
    const quizUrl = `${baseUrl}/quiz/${newQuiz._id}`;

    res
      .status(201)
      .json({ message: "Quiz created successfully!", quizUrl: quizUrl });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const quizDetails = await Quiz.findById(quizId);

    if (!quizDetails) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    quizDetails.totalViews += 1;
    await quizDetails.save();

    res.status(200).json(quizDetails);
  } catch (error) {
    next("error");
  }
};

const getQuizStats = async (req, res) => {
  try {
    const totalQuiz = await Quiz.find({ refUserId: req.userId });
    let totalQuestions = 0;
    let views = 0;
    for (let i = 0; i < totalQuiz.length; i++) {
      totalQuestions += totalQuiz[i].questions.length;
      views += totalQuiz[i].totalViews;
    }

    return res.status(200).json({
      quiz: totalQuiz,
      number_of_quizzes: totalQuiz.length,
      total_number_of_questions: totalQuestions,
      totalViews: views,
    });
  } catch (error) {
    console.log("Error retrieving quiz stats:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteQuiz= async (req, res) => {
  try {
    const quizId = req.params.id;
    await Quiz.findByIdAndDelete(quizId)
    const quizzes = await Quiz.find({ refUserId: req.userId });

    res.status(200).json(quizzes);
    
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const postOptionSelected = async (req, res) => {
  try {
    const quizId = req.params.id;
    const { qnumber, selected } = req.body;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let options = quiz.questions[qnumber].options;

    options.map((opt) => {
      if (opt.option === selected) {
        opt.count += 1;
      }
    });

    await quiz.save();

    res.status(200).json({ message: "Option count updated successfully" });
  } 
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getQuiz,
  createQuiz,
  deleteQuiz,
  getQuizStats,
  postOptionSelected,

};
