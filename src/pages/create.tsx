import {useEffect, useState} from "react";
import NameInput from "../components/create/NameInput";
import QuestionInput from "../components/create/QuestionInput";
import ConfirmPage from "@/components/create/ConfirmPage";

const CreateQuiz = () => {


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
  

  function submitHandler(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log('here')
  }

  return (
    <section onSubmit={submitHandler}>
      <h1>Create Quize</h1>

      <form>
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
          questions={[
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
          ]}
        />
      </form>
    </section>
  );
}

export default CreateQuiz;