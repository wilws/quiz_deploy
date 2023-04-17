import React from "react";

type PropType = {
  title: string;
  setAnswer: (answer: boolean) => void;
  setQuestion: (question: string) => void;
  answer: boolean;
  question: string;
  pageNo: number;
  currentPage: number;
  setCurrentPage: (pageNo: number) => void;
};

const QuestionInput = (props: PropType):JSX.Element => {
    
    const {
      title,
      setAnswer,
      setQuestion,
      answer,
      question,
      pageNo,
      setCurrentPage,
      currentPage,
    } = props;


    function radioButtonOnClickHandler(
      event: React.ChangeEvent<HTMLInputElement>
    ) {
        setAnswer((event?.target.value === "true")? true: false );
    }

    function textAreaOnChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setQuestion(event?.target.value);
    }  


  return (
    <>
      {currentPage == pageNo && (
        <>
          <label htmlFor="question1">{title}</label>
          <br />
          <textarea
            name="question1"
            id="question1"
            placeholder="Type Question 1"
            value={question}
            onChange={textAreaOnChangeHandler}
          />
          <br />
          <p>answer</p>
          {answer ? (
            <>
              <input
                type="radio"
                id="ans1-true"
                name="ans1"
                value="true"
                onChange={radioButtonOnClickHandler}
                defaultChecked
              />
              <label htmlFor="ans1">Yes</label>
              <input
                type="radio"
                id="ans1-false"
                name="ans1"
                value="false"
                onChange={radioButtonOnClickHandler}
              />
              <label htmlFor="ans1">No</label>
            </>
          ) : (
            <>
              <input
                type="radio"
                id="ans1-true"
                name="ans1"
                value="true"
                onChange={radioButtonOnClickHandler}
              />
              <label htmlFor="ans1">Yes</label>
              <input
                type="radio"
                id="ans1-false"
                name="ans1"
                value="false"
                onChange={radioButtonOnClickHandler}
                defaultChecked
              />
              <label htmlFor="ans1">No</label>
            </>
          )}

          <br></br>
          <button
            onClick={() => {
              setCurrentPage(pageNo - 1);
            }}
          >
            Back
          </button>

          <br></br>
          <button
            onClick={() => {
              setCurrentPage(pageNo + 1);
            }}
          >
            Next
          </button>
        </>
      )}
    </>
  );
};

export default QuestionInput;
