
import Link from "next/link";

type PropsType = {
  quizNo: number;
  firstQuestion: string;
  creatorName: string;
  userId: number;
};

const Card = (props:PropsType):JSX.Element => {

    const { quizNo, firstQuestion, creatorName, userId } = props;

    return (
      <li className={style.li}>
       <Link
          href={`/view/${userId}`}
          style={{ textDecoration: "none" }}
        >
        <div className={style.card}>
          <p className={style.quizNo}>Q{quizNo}</p>
          <div className={style.questionWrapper}>
            <p className={style.question}>{firstQuestion}</p>
          </div>
          <p className={style.name}>{creatorName}</p>
        </div>
        </Link>
      </li>
    );
}

export default Card;

const style = {
  li: 
  `flex flex-col w-full h-60 max-h-60 justify-top
   md:w-1/3 md:h-80 md:max-h-80 md:justify-center md:items-center
   
   lg:w-1/4`,

  card: 
  `border border-grey-500 rounded-md w-full h-48 max-h-48 shadow-lg shadow-grey-500/50 p-3 flex flex-col  cursor-pointer  text-black
   md:w-64 md:h-60 md:max-h-60`,

  quizNo: 
  `text-2xl font-black m-0 h-7`,

  questionWrapper: 
  `flex flex-col w-full h-28 max-h-28 justify-center
  md:h-40 max-h-40`,

  question: `text-xl text-ellipsis overflow-hidden text-gray-500  text-center`,

  name: `border-t-2 border-gray-400 h-6 pt-1 pr-1 text-right uppercase font-semibold  text-ellipsis overflow-hidden`,
};