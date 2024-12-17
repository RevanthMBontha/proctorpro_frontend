import { v4 as uuidV4 } from "uuid";

export const getNewQuestion = () => {
  return {
    id: uuidV4(),
    questionType: "mcq",
    questionText: "",
    questionImg: "",
    options: [
      { id: uuidV4(), value: "" },
      { id: uuidV4(), value: "" },
    ], //for MCQs and Fills
    correctAnswer: [], //String for MCQ, Array for Cloze, Object for Categorise
    clozeText: "",
    subQuestions: [
      {
        id: uuidV4(),
        questionType: "mcq",
        questionText: "",
        questionImg: "",
        options: [], //for MCQs and Fills
        correctAnswer: [], //String for MCQ, Array for Cloze, Object for Categorise
        clozeText: "",
        comprehensionText: "", //String for Comprehension
        subQuestions: [], //Array of sub-questions for Comprehension
        categories: [], //Array of categories for Categorise
        items: [], //For Categorise and Cloze
        points: 0,
      },
    ], //Array of sub-questions for Comprehension
    categories: [], //Array of categories for Categorise
    items: [], //For Categorise and
    points: 0,
  };
};

export const getNewSubQuestion = () => {
  return {
    id: uuidV4(),
    questionType: "mcq",
    questionText: "",
    questionImg: "",
    options: [
      { id: uuidV4(), value: "" },
      { id: uuidV4(), value: "" },
    ], //for MCQs and Fills
    correctAnswer: [], //String for MCQ, Array for Cloze, Object for Categorise
    clozeText: "",
    subQuestions: [], //Array of sub-questions for Comprehension
    categories: [], //Array of categories for Categorise
    items: [], //For Categorise and
    points: 0,
  };
};
