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

  if (currentPage !== pageNo) return (<></>);

  return (
    <div className={style.questionInputPage}>
      <p className={style.p}>
        <span>
          Please set your <br />
          <span>
            {" "}
            {pageNo === 2 ? "first" : pageNo === 3 ? "second" : "third"}{" "}
          </span>
          question and Answer
        </span>
      </p>

      <textarea
        name="question"
        className={style.textarea}
        id="question"
        placeholder="Type your question here "
        value={question}
        onChange={textAreaOnChangeHandler}
      />

      <div className={style.answerGroup}>
        <h4 className={style.h}>Answer : </h4>

        {answer ? (
          <div className={style.radioBtnGroup}>
            <div className={style.radioBtnWithLabel}>
              <input
                type="radio"
                className={style.radioBtn}
                id="ans-true"
                name="ans"
                value="true"
                onChange={radioButtonOnClickHandler}
                defaultChecked
              />
              <label htmlFor="ans">Yes</label>
            </div>

            <div className={style.radioBtnWithLabel}>
              <input
                type="radio"
                className={style.radioBtn}
                id="ans-false"
                name="ans"
                value="false"
                onChange={radioButtonOnClickHandler}
              />
              <label htmlFor="ans">No</label>
            </div>
          </div>
        ) : (
          <div className={style.radioBtnGroup}>
            <div className={style.radioBtnWithLabel}>
              <input
                type="radio"
                className={style.radioBtn}
                id="ans-true"
                name="ans"
                value="true"
                onChange={radioButtonOnClickHandler}
              />
              <label htmlFor="ans">Yes</label>
            </div>
            <div className={style.radioBtnWithLabel}>
              <input
                type="radio"
                className={style.radioBtn}
                id="ans1-false"
                name="ans"
                value="false"
                onChange={radioButtonOnClickHandler}
                defaultChecked
              />
              <label htmlFor="ans">No</label>
            </div>
          </div>
        )}
      </div>

      <div className={style.buttonGroup}>
        <button
          className={style.button}
          onClick={() => {
            setCurrentPage(pageNo - 1);
          }}
        >
          Back
        </button>

        <button
          className={
            (!question) ? style.buttonDisable : style.button
          }
          onClick={() => {
            setCurrentPage(pageNo + 1);
          }}
          disabled={!question}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionInput;


const style = {
  questionInputPage: `w-full hf-full flex flex-col  items-center pb-10
  md:pt-20
  lg:pt-20`,

  p: `w-full h-32 text-2xl text-center flex flex-col justify-end items-center mb-10
  md:text-4xl md:mb-20 md:tracking-wide 
  lg:leading-tight`,

  textarea: `border-2 border-red text-left pt-10 pl-2 pr-2 w-4/5 h-48 rounded-xl text-center text-xl mb-4
  md:h-80 md:mb-10 md:text-3xl md:text-left md:pl-4 pr-4 `,

  answerGroup: `w-4/5 flex flex-row justify-between mt-6 pl-2 pr-2 mb-20
  md:pl-3 md:pr-3 md:mb-20 `,

  h: `w-1/3 text-lg tracking-wider mb-0
  md:text-4xl `,

  radioBtnGroup: `w-2/3 flex flex-row justify-end`,

  radioBtn: `mr-2`,

  radioBtnWithLabel: `text-xl w-20  flex flex-row justify-end items-center
  md:text-4xl md:w-64`,

  buttonGroup: `w-4/5 flex flex-row justify-between`,

  // button: `border-2 border-red cursor-pointer tracking-widest  w-40 bg-black text-white h-10 rounded-xl
  // md:w-64 md:h-16 md:text-3xl md:font-thin`,

  // buttonDisable: ` tracking-widest  w-40 bg-gray-300 text-white h-10 rounded-xl
  // md:w-64 md:h-16 md:text-3xl md:font-thin`,

  // exitButton: `mt-20 text-black`,

  exitButton: `border-2 border-red cursor-pointer tracking-widest  bg-black text-white 
  w-28 h-9 rounded-xl
  md:w-40 md:h-12 md:text-2xl md:font-thin`,

  button: `border-2 border-red cursor-pointer tracking-widest  bg-black text-white 
  w-28 h-9 rounded-xl
  md:w-40 md:h-12 md:text-2xl md:font-thin`,

  buttonDisable: `border-2 border-red cursor-pointer tracking-widest bg-gray-300 text-white
  w-28 h-9 rounded-xl
  md:w-40 md:h-12 md:text-2xl md:font-thin`,
};





