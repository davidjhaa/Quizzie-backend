const Quiz = require("../models/quizModel");

// const createQuiz = async (req, res) => {
//   console.log(req.userId);
//   const { Questions, optionType, quizName, quizType } = req.body;
//   console.log(Questions)
//   const newQuiz = new Quiz({
//     quizName: quizName,
//     quizType: quizType,
//     optionType: optionType,
//     questions: Questions,
//     refUserId: req.userId,
//   });

//   res.status(200).json({ message: "Quiz created successfully!" });

//   newQuiz.save();
// };

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

    // Construct the URL to access the newly created quiz
    const quizUrl = `/quiz/${newQuiz._id}`;

    // Send the URL in the response
    res.status(201).json({ message: "Quiz created successfully!", quizUrl: quizUrl });
  } 
  catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const quizDetails = await Quiz.findById(quizId);

    if (!quizDetails) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quizDetails);
  } catch (error) {
    next("error");
  }
};

const getQuizStats = async (req, res) => {
  try {
    // Count the number of quiz entries
    const quizCount = await Quiz.countDocuments();

    // Count the total number of questions across all quizzes
    const totalQuestions = await Quiz.aggregate([
      {
        $project: {
          numQuestions: { $size: '$questions' }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$numQuestions' }
        }
      }
    ]);

    // Log the counts
    console.log('Number of quiz entries:', quizCount);
    console.log('Total count of questions across all quizzes:', totalQuestions.length > 0 ? totalQuestions[0].total : 0);

    // Return the counts in the response
    return res.status(200).json({ 
      'number_of_quizzes': quizCount,
      'total_number_of_questions': totalQuestions.length > 0 ? totalQuestions[0].total : 0
    });
  } catch (error) {
    console.error('Error retrieving quiz stats:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  getQuiz,
  createQuiz,
  getQuizStats
};
