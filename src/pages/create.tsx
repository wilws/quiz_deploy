import {useState} from "react";
import NameInput from "../components/create/NameInput";
import QuestionInput from "../components/create/QuestionInput";
import ConfirmPage from "@/components/create/ConfirmPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQuiz } from "../request/quiz";
import { Progress } from "semantic-ui-react";
import AfterCreationPopUp from "@/components/create/AfterCreationPopUp";

const CreateQuiz = () => {

  const [statusCode, setStatusCode] = useState<number|null>(null);

  const queryClient = useQueryClient();
      const createPostMutation = useMutation({
        mutationFn: postQuiz,
        onSuccess: (data) => {
          setStatusCode(data);
          queryClient.invalidateQueries(["quizzes"], { exact: true });
        },
      });


    // Name Input
    const [creatorName, setCreatorName] = useState<string>("");


    // Question 1 Input
    const [question1, setQuestion1] = useState<string>("");
    const [answer1, setAnswer1] = useState<boolean>(true);

    
    // Question 2 Input
    const [question2, setQuestion2] = useState<string>("");
    const [answer2, setAnswer2] = useState<boolean>(true);


    // Question 3 Input
    const [question3, setQuestion3] = useState<string>("");
    const [answer3, setAnswer3] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
  


    function constructQuestionAnswerArray(): Array<QuestionAnswer> {
      return [
          {
            question: question1,
            answer: answer1,
          },
          {
            question: question2,
            answer: answer2,
          },
          {
            question: question3,
            answer: answer3,
          },
      ]
    }


    function submitHandler(e: React.FormEvent<HTMLInputElement>) {
      e.preventDefault();
      createPostMutation.mutate({
        creatorName,
        questions: constructQuestionAnswerArray(),
      });
    }

    
    return (
      <section onSubmit={submitHandler} className={style.createPage}>
        <div className={style.wrapper}>
          <header className={style.header}>
            <div className={style.progressBar}>
              <Progress
                percent={(currentPage / 5) * 100}
                size="tiny"
                color="black"
              ></Progress>
            </div>
          </header>

          <form className={style.form}>
            <NameInput
              creatorName={creatorName}
              setCreatorName={setCreatorName}
              pageNo={1}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            <QuestionInput
              title="Set Question One"
              setAnswer={setAnswer1}
              setQuestion={setQuestion1}
              answer={answer1}
              question={question1}
              pageNo={2}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            <QuestionInput
              title="Set Question Two"
              setAnswer={setAnswer2}
              setQuestion={setQuestion2}
              answer={answer2}
              question={question2}
              pageNo={3}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            <QuestionInput
              title="Set Question Three"
              setAnswer={setAnswer3}
              setQuestion={setQuestion3}
              answer={answer3}
              question={question3}
              pageNo={4}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            <ConfirmPage
              creatorName={creatorName}
              pageNo={5}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              questions={constructQuestionAnswerArray()}
            />
          
            { (statusCode) && <AfterCreationPopUp statusCode={statusCode} />}
          </form>
        </div>
      </section>
    );
}

export default CreateQuiz;


const style = {
  createPage: `z-50 relative w-screen h-screen flex flex-row justify-center overflow-auto`,
  wrapper: `max-w-screen-xl w-full h-full`,
  header: `flex flex-col justify-center  w-full pl-4 pr-4 pt-8 h-30 `,
  progressBar: ``,
  form: ``,
};