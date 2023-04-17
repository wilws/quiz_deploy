import { useEffect, useState } from "react";

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
      <div>
        {resultList.map((result) => (
          <p key={resultKey++}>{result.description}</p>
        ))}
      </div>
    );
};

export default ResultDisplay;