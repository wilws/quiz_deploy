
type PropsType = {
  pageNo: number;
  question: string;
  currentPage: number;
  setCurrentPage: (pageNo: number) => void;
  setAnswerList: (ans: any) => void;
};

const QuestionDisplay = (props:PropsType):JSX.Element => {
    const { pageNo, question, currentPage, setCurrentPage, setAnswerList } =
      props;

    if (currentPage !== pageNo) return (<></>);

    function clickAnswer(ans:boolean){
        setAnswerList((prevState:Array<boolean>) => [...prevState, ans]);
        setCurrentPage(pageNo + 1);
    }

   return (
     <div>
       <p> {question}</p>
       <p>answer</p>
       <button
         onClick={() => {
           clickAnswer(true)
         }}
       >
         Yes
       </button>
       <button
         onClick={() => {
           clickAnswer(false)
         }}
       >
         No
       </button>
     </div>
   );
}


export default QuestionDisplay;