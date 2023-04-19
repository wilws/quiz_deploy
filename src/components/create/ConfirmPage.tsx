import Link from "next/link";

type PropType = {
  creatorName: string;
  pageNo: number;
  currentPage: number;
  setCurrentPage: (pageNo: number) => void;
  questions: Array<QuestionAnswer>;
};

const NoComponent = ({ questionNo }: { questionNo: number }): JSX.Element => {
  return (
    <div className={style.questionNoWrapper}>
      <p className={style.questionNo}>
        <span>{questionNo}</span>
      </p>
    </div>
  );
};

const ConfirmPage = (props: PropType) => {
  const { creatorName, questions, pageNo, currentPage, setCurrentPage } = props;

  if (currentPage !== pageNo) return <></>;

  let questionKey = 1;
  return (
    <div className={style.confirmPage}>
      <div className={style.creatorNameWrapper}>
        <h3 className={style.creatorName}>
          {creatorName}
          <span className={style.badge}>creator</span>
        </h3>
      </div>

      <ul className={style.ul}>
        {questions.map((q) => {
          return (
            <li className={style.li} key={questionKey++}>
              <NoComponent questionNo={questionKey} />
              <div className={style.questionWrapper}>
                
               {q.question}
                
                <div className={style.answerWrapper}>
                  - {q.answer ? "Yes" : "No"}
                </div>

              </div>
            </li>
          );
        })}
      </ul>

      <div className={style.buttonGroup}>
        <button
          className={style.backButton}
          onClick={() => {
            setCurrentPage(4);
          }}
        >
          Back
        </button>

      
        <button className={style.confirmButton} type="submit" value="Submit">
          Confirm
        </button>
       
      </div>
    </div>
  );
};

export default ConfirmPage;

const style = {
  confirmPage: `pl-10 pr-10 pb-20 
  md:pl-20 md:pr-20`,

  creatorNameWrapper: `mb-10 mt-10 pl-2
  md:mt-20`,

  creatorName: `text-2xl uppercase
   md:text-4xl`,

  badge: `rounded-xl text-xs font-thin pl-2 pr-2 ml-3 border-2 border-gray-600 text-gray-600
  md:text-lg md:ml-5`,

  ul: `pl-2 pr-2 
  md:mt-20`,

  li: `w-full flex flex-row
  mb-20
  md:mb-30`,
  
  questionNoWrapper: `w-20 flex flex-row justify-left
  md:w-40`,

  questionNo: `w-14 h-14 text-3xl rounded-lg border-2 border-black flex flex-col justify-center items-center font-black text-black
  md:w-28 md:h-28 md:text-5xl`,

  questionWrapper: `w-3/4 text-clip overflow-hidden relative leading-6
  md:text-3xl md:leading-loose`,

  answerWrapper: `font-black text-black text-right w-full`,

  buttonGroup: `w-full flex flex-row justify-between`,
  backButton: `border-2 border-black cursor-pointer tracking-widest  w-40 bg-black text-white h-10 rounded-xl
   md:w-64 md:h-16 md:text-3xl md:font-thin`,
  confirmButton: `border-2 border-red cursor-pointer tracking-widest  w-40 bg-red-700 text-white h-10 rounded-xl
   md:w-64 md:h-16 md:text-3xl md:font-thin`,
};
