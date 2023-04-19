import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from 'semantic-ui-react'


type PropsType = {
  pageNo: number;
  currentPage: number;
  answerList: Array<boolean>;
  markingList: Array<string>;
};

type ResultObj = {
    result: boolean;
    description: string;
}

const ResultDisplay = (props:PropsType):JSX.Element => {

    const { answerList, markingList, currentPage, pageNo} = props;
    const [ resultList, setResultList] = useState<Array<ResultObj>>([]);
    
    useEffect(()=>{

       setResultList([]);
        for (let i=0; i < answerList.length; i++) {
            let description: string;
            let result: boolean
            if (answerList[i].toString() == markingList[i].toString()) {
                result = true;
                description = `Question ${i + 1} - Correct !`;
            } else {
                result = false;
                description = `Question ${i + 1} - Wrong !`;
            }

            setResultList((prevState) => [
              ...prevState,
              { result, description },
            ]);
        }

    },[answerList,markingList])

    if (currentPage !== pageNo) return <></>;
  
    let resultKey = 0
    return (
      <div className={style.resultPage}>

        <ul className={style.ul}>
          {resultList.map((result) => (
            <div key={resultKey++} className={style.answer}>
              <div className={style.icon}>
                {result.result ? (
                  <Icon circular color="black" name="check" size="big" />
                ) : (
                  <Icon circular color="black" name="close" size="big" />
                )}
              </div>
              <p className={style.description}>{result.description}</p>
            </div>
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
  z-50 relative w-full h-full overflow-hiddens flex flex-col justify-center  items-center text-lg tracking-wider font-light gap-7
  md:gap-20
  lg:gap-0 lg:pt-40`,

  backHomeBtn: `w-40 bg-black text-white h-10 rounded-xl
  md:w-60 md:h-16 md:text-3xl md:font-light
  lg:w-30 lg:h-10 lg:text-xl lg:mt-10
  `,

  ul: `overflow-auto 
  md:-mt-40`,

  answer: `w-full flex flex-row  items-center mb-10
  lg:mb-20`,

  description: `md:text-4xl md:font-thin
  lg:text-3xl `,

  icon: `mr-8
  md:mr-12`,
};