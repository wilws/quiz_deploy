import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "@/request/quiz";
import { paramIdSanitiser } from "../../utils/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import  QuestionDisplay  from "@/components/view/QuestionDisplay";
import ResultDisplay from "@/components/view/ResultDisplay";

const ViewQuiz = () => {

    const router = useRouter();
    const [ answerList, setAnswerList ] = useState<Array<boolean>>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
  

    const quiz = useQuery({
      queryKey: ["quiz", paramIdSanitiser(router.query.id)],
      queryFn: () => getQuiz(paramIdSanitiser(router.query.id)),
      enabled: router.isReady,
    });

    const { data } = quiz;

    
    let questionKey = 1;
    const markingList:Array<string> = [];
    return (
      <div>
        {data ? (
          <div>
            <h1>This is ViewQuiz</h1>
            <div>{data.id}</div>
            <div>{data.name}</div>
            <div>{data.createdAt}</div>
            {data.question.map((q) => {
              markingList.push(q.answer);
              return (
                <QuestionDisplay
                  key={questionKey++}
                  pageNo={questionKey}
                  question={q.question}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setAnswerList={setAnswerList}
                />
              );
            })}

            <ResultDisplay
              pageNo={questionKey}
              currentPage={currentPage}
              answerList={answerList}
              markingList={markingList}
            />
          </div>
        ) : (
          <div>No such user</div>
        )}
      </div>
    );
}

export default ViewQuiz;