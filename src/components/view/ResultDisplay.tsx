import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from 'semantic-ui-react'


type PropsType = {
  pageNo: number;
  currentPage: number;
  answerList: Array<boolean>;
  markingList: Array<string>;
  question:Array<Question>
};

type ResultObj = {
    result: boolean;
    questionString: string;
    userAnswer: string;
    correctAnswer: string;
    description: string;
}

const ResultDisplay = (props:PropsType):JSX.Element => {

    const { answerList, markingList, currentPage, pageNo, question } = props;
    const [ resultList, setResultList] = useState<Array<ResultObj>>([]);
    

    useEffect(() => {
      if (currentPage !== 4) return;

      setResultList([]);
      for (let i = 0; i < answerList.length; i++) {
        let description: string;
        let result: boolean;
        const userAnswer = answerList[i] ? "Yes" : "No";
        const correctAnswer = markingList[i] ? "Yes" : "No";
        const questionString = question[i].question;

        if (answerList[i].toString() == markingList[i].toString()) {
          result = true;
          description = `Question ${i + 1} - Correct !`;
        } else {
          result = false;
          description = `Question ${i + 1} - Wrong !`;
        }

        setResultList((prevState) => [
          ...prevState,
          {
            result,
            description,
            userAnswer,
            questionString,
            correctAnswer,
          },
        ]);
      }
    }, [answerList, markingList, currentPage, question]);


    if (currentPage !== pageNo) return <></>;
  
    let resultKey = 0
    return (
      <div className={style.resultPage}>
        <ul className={style.ul}>
          {resultList.map((result) => (
            <li key={resultKey++} className={style.resultWrapper}>
              <div className={style.answer}>
                <div className={style.icon}>
                  {result.result ? (
                    <Icon circular color="black" name="check" size="big" />
                  ) : (
                    <Icon circular color="black" name="close" size="big" />
                  )}
                </div>
                <p className={style.description}>{result.description}</p>
              </div>

              <p className={style.questionString}>{result.questionString}</p>

              <div className={style.answerGroup}>
                <p className={style.userAnswer}>
                  Your Ans: {result.userAnswer}
                </p>
                <p className={style.correctAnswer}>
                  Correct Ans: {result.correctAnswer}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Link href="/" style={{ textDecoration: "none" }}>
          <button type="button" className={style.backHomeBtn}>
            Back to Home
          </button>
        </Link>
      </div>
    );
};

export default ResultDisplay;


const style = {
  resultPage: `
  z-50 relative w-full flex flex-col justify-center items-center pt-10

  lg:gap-0 lg:pt-40`,

  backHomeBtn: `w-40 bg-black text-white h-10 rounded-xl mb-36
  md:w-60 md:h-16 md:text-3xl md:font-light
  lg:w-30 lg:h-10 lg:text-xl lg:mt-10 lg:mb-10
  `,

  ul: `p-10 w-full max-w-2xl
  md:mt-20
  lg:-mt-10`,

  resultWrapper: `w-full mb-14`,

  answer: `w-full flex flex-row  items-center mb-1
  md:mb-5
  lg:mb-1`,

  description: `text-xl tracking-wider
  md:text-4xl 
  lg:text-3xl`,

  icon: `mr-8
  md:mr-12`,

  questionString: `text-justify pl-2 pr-2 text-xl
  md:text-2xl
  lg:mt-4 lg:text-xl`,

  answerGroup: `flex flex-row justify-between items-center w-full pl-2 pr-2 mt-4`,

  userAnswer: `text-md  font-bold
  md:text-2xl
  lg:text-xl`,

  correctAnswer: `text-md border-gray-500 border-2 rounded-xl text-grey  pl-2 pb-1 pr-2 pt-1 -translate-y-3`,
};