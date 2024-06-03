const Quiz = require("../models/quizModel");

const createQuiz = async (req, res) => {
  try {
    const { Questions, optionType, quizName, quizType } = req.body;
    console.log(Questions)
    console.log(optionType)
    console.log(quizName)
    console.log(quizType)

    const newQuiz = new Quiz({
      quizName: quizName,
      quizType: quizType,
      optionType: optionType,
      questions: Questions,
      refUserId: req.userId,
    });

    await newQuiz.save();

    res
      .status(201)
      .json({ message: "Quiz created successfully!", quizId: newQuiz._id });
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

const updateQuiz = async (req, res) => {
  try {
    const { Questions, quizId } = req.body;
    console.log(quizId)

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        questions: Questions,
      },
      { new: true } 
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz updated successfully!", quiz: updatedQuiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  updateQuiz,
};
