
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
      <div className={style.questionPage}>

        <div className={style.question}>
          <p> {question}</p>
        </div>

 
          <div className={style.buttonGroup}>

          <button
            className={style.button}
            onClick={() => {
            clickAnswer(true);
            }}
            >
            Yes
          </button>

          <button
            className={style.button}
            onClick={() => {
            clickAnswer(false);
            }}
            >
            No
          </button>

          </div>
       
      </div>
   );
}


export default QuestionDisplay;


const style = {
  questionPage: `w-full h-full overflow-hiddens flex flex-col items-center`,

  question: `grow bg-red w-full flex flex-col items-center justify-center text-2xl font-light text-center p-3
  md:text-4xl md:tracking-wider 
  lg:text-5xl lg:tracking-widest lg:pl-52 lg:pr-52`,

  buttonGroup: `flex-none w-full h-44 flex flex-row justify-between p-4
  md:pl-14 md:pr-14
  lg:h-72 lg:w-3/5`,

  button: `w-40 bg-black text-white h-10 rounded-xl
  md:w-60 md:h-16 md:text-4xl md:font-light
  `,
};