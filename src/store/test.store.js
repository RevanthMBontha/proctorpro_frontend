import { create } from "zustand";

const useTestStore = create((set, get) => ({
  // State variables to track the questions, the selected question and selected sub question
  id: null,
  name: "",
  description: "",
  imgSrc: null,
  img: null,
  questions: [],
  createdBy: null,
  selectedQuestionId: null,
  selectedSubQuestionId: null,

  // Function to set the name of the test
  setTestName: (value) => set(() => ({ name: value })),

  // Function to set the description of the test
  setTestDescription: (value) => set(() => ({ description: value })),

  // Function to get the selected question
  getQuestionById: (id) => {
    const questions = get().questions;
    return questions.find((question) => question.id === id);
  },

  // Function to add a new question to the test
  addQuestion: (newQuestion) =>
    set((state) => ({
      questions: [...state.questions, newQuestion],
    })),

  // Function to add a new question at a index
  addQuestionAtIndex: (index, newQuestion) => {
    set((state) => {
      const startSlice = state.questions.slice(0, index);
      const endSlice = state.questions.slice(index, state.questions.length);
      return { questions: [...startSlice, newQuestion, ...endSlice] };
    });
  },

  // Function to update a question
  updateQuestion: (id, updatedQuestion) =>
    set((state) => {
      const thisIndex = state.questions.findIndex(
        (question) => question.id === id,
      );

      const startQuestions = state.questions.slice(0, thisIndex);
      const endQuestions = state.questions.slice(
        thisIndex + 1,
        state.questions.length,
      );

      return {
        questions: [...startQuestions, updatedQuestion, ...endQuestions],
      };
    }),

  // Function to delete a question
  deleteQuestion: (id) =>
    set((state) => ({
      questions: [...state.questions.filter((question) => question.id !== id)],
    })),

  // Function to select a question id
  selectQuestionId: (id) =>
    set(() => ({
      selectedQuestionId: id,
    })),

  // Function to reset the selection
  resetSelection: () =>
    set(() => ({
      selectedQuestionId: null,
    })),

  // -------------------------------------
  // For subQuestions

  // Function to select subQuestion Id
  selectSubQuestionId: (id) => set(() => ({ selectedSubQuestionId: id })),

  // Function to get the selected subQuestion
  getSubQuestionById: (qId, subQId) => {
    const questions = get().questions;
    const question = questions.find((question) => question.id === qId);
    const subQuestion = question.subQuestions.find(
      (subQuestion) => subQuestion.id === subQId,
    );
    return subQuestion;
  },

  // Function to get new subQuestion
  getNewSubQuestion: () => get().newSubQuestion,
}));

export default useTestStore;
