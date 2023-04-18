
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
  li: "flex flex-col w-full h-56 justify-top",
  card: "border border-grey-500 rounded-md w-full h-48 shadow-lg shadow-grey-500/50 p-3 flex flex-col  cursor-pointer  text-black",
  quizNo: "text-2xl font-black m-0",
  questionWrapper: "flex flex-col w-full h-40 justify-center",
  question: "text-xl text-ellipsis overflow-hidden text-gray-500  text-center",
  name: "border-t-2 border-gray-400  pt-1 pr-1 text-right uppercase font-semibold",
};