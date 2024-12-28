import { useQuery } from "@tanstack/react-query";
import api from "../../../axios";
import AttemptMCQ from "./AttemptMCQ";
import Loading from "../../Loading";
import AttemptCategorise from "./AttemptCategorise";
import AttemptCloze from "./AttemptCloze";
import AttemptComprehension from "./AttemptComprehension";
import PropTypes from "prop-types";

const AttemptQuestion = ({ id, questionNumber, solutions, setSolutions }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["questions", "attempt", `${id}`],
    queryFn: async () => {
      const response = await api.get(`/questions/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) console.log("Error: ", error);
  if (isError) return <div>Something went wrong! check your console.</div>;

  return (
    <div className="flex flex-col gap-y-4 rounded-md border border-neutral-300 p-4">
      <div className="flex w-full items-center justify-between">
        <div className="text-3xl">Question {questionNumber}</div>
        <div className="rounded-md border border-neutral-300 p-2">
          Points: {data.question.points}
        </div>
      </div>

      {data.question.type === "mcq" && (
        <AttemptMCQ
          thisQuestion={data.question}
          solutions={solutions}
          setSolutions={setSolutions}
        />
      )}
      {data.question.type === "categorise" && (
        <AttemptCategorise
          thisQuestion={data.question}
          solutions={solutions}
          setSolutions={setSolutions}
        />
      )}
      {data.question.type === "cloze" && (
        <AttemptCloze
          thisQuestion={data.question}
          solutions={solutions}
          setSolutions={setSolutions}
        />
      )}
      {data.question.type === "comprehension" && (
        <AttemptComprehension
          thisQuestion={data.question}
          thisQuestionNumber={questionNumber}
          solutions={solutions}
          setSolutions={setSolutions}
        />
      )}
    </div>
  );
};

AttemptQuestion.propTypes = {
  id: PropTypes.string,
  questionNumber: PropTypes.string,
  solutions: PropTypes.object,
  setSolutions: PropTypes.func,
};

export default AttemptQuestion;
