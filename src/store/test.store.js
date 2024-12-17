import { create } from "zustand";

const useTestStore = create((set, get) => ({
  // State variables to track the questions and the selected question
  questions: [],
  selectedQuestionId: null,

  //   Function to add a new question to the test
  addQuestion: (newQuestion) =>
    set((state) => ({
      questions: [...state.questions, newQuestion],
    })),

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

  // Function to select a particular question based on id
  selectQuestion: (id) =>
    set(() => ({
      selectedQuestionId: id,
    })),

  // Function to reset the selection
  resetSelection: () =>
    set(() => ({
      selectedQuestionId: null,
    })),

  // Function to get the selected question
  getQuestionById: (id) => {
    const questions = get().questions;
    return questions.find((question) => question.id === id);
  },
}));

export default useTestStore;
