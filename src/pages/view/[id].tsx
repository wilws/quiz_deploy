import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "@/request/quiz";
import { paramIdSanitiser } from "../../utils/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import  QuestionDisplay  from "@/components/view/QuestionDisplay";
import ResultDisplay from "@/components/view/ResultDisplay";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import Link from "next/link";



const ErrorPage = (props:{errorMsg:string}):JSX.Element => {

  return (
    <div className={style.errorPage}>
      <pre>{props.errorMsg}</pre>

      <Link href="/" style={{ textDecoration: "none" }}>
        <button type="button" className={style.errorPageBtn}>
          Back to Home
        </button>
      </Link>
    </div>
  );
}

const ViewQuiz = () => {

    const router = useRouter();
    const [ answerList, setAnswerList ] = useState<Array<boolean>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
  
    const quiz = useQuery({
      queryKey: ["quiz", paramIdSanitiser(router.query.id)],
      queryFn: () => getQuiz(paramIdSanitiser(router.query.id)),
      enabled: router.isReady,
    });


    if (quiz.status === 'loading') {
      return (
        <div>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </div>
      );
    }


    if (quiz.status === "error") {
      const errorMsg = quiz.error?.message
        ? JSON.stringify(quiz.error.message)
        : "Error in Fetching UserData";
      return <ErrorPage errorMsg={errorMsg} />;
    }


    const { data } = quiz;
    if (!data) return <ErrorPage errorMsg={"No user is found"} />;
    

    let questionKey = 1;
    const markingList:Array<string> = [];
  
    return (
      <section className={style.section}>
        <header className={style.header}>
          <div className={style.quizNo}>
            <span>Q{data?.id}</span>
          </div>

          <div className={style.createInfo}>
            <span className={style.creatorIntro}>This Quiz is created by : </span>
           
            <div className={style.creator}>{data?.name}</div>
            <div className={style.createAt}>
              {data?.createdAt.split("T")[0]}
            </div>
          </div>

          <div className={style.pageNo}>
            <span> {currentPage < 4 ? `${currentPage}/3` : "Result"} </span>
          </div>
          <div className={style.pageNoLong}>
            <span>
              {" "}
              {currentPage < 4 ? `Question ${currentPage}` : "Result"}{" "}
            </span>
          </div>
        </header>

        <main className={style.main}>
          {data?.question.map((q) => {
            markingList.push(q.answer);
            return (
              <QuestionDisplay
                key={questionKey++}
                pageNo={questionKey}
                question={q.question}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setAnswerList={setAnswerList}
              />
            );
          })}

          <ResultDisplay
            pageNo={questionKey}
            currentPage={currentPage}
            answerList={answerList}
            markingList={markingList}
          />
        </main>
      </section>
    );
}

export default ViewQuiz;


const style = {
  errorPage: `w-screen h-screen flex flex-col justify-center items-center`,

  errorPageBtn: `cursor-pointer mt-3 border-2 border-black text-black pl-2 pr-2`,

  section: `w-screen h-screen flex flex-col items-center overflow-hidden
  lg:flex lg:flex-row`,

  header: `border-b-2  border-b-black w-full p-2 flex flex-row h-26 justify-between gap-4
  md:h-48 md:p-5
  lg:fixed lg:left:0 lg:top:0
  lg:h-full lg:flex lg:flex-col lg:justify-between lg:w-1/5 lg:border-0`,

  main: `grow  w-full
  lg:h-full lg:w-screen`,

  quizNo: `flex-none h-20 w-20 border-2 border-black flex flex-col justify-center items-center text-2xl
  md:h-36 md:w-36 md:text-5xl md:font-bold md:border-4  md:mr-4
 `,

  createInfo: `flex-1 flex flex-col justify-center text-center border-l-2 border-r-2 border-black-100 rounded-sm tracking-wider uppercase font-thin
  md:text-4xl
  lg:border-0 lg:items-baseline lg:justify-end `,

  creatorIntro: `hidden lg:block lg:text-sm lg:tracking-tight lg:translate-y-1`,
  creator: `translate-y-1
  lg:text-6xl lg:text-left lg:font-black`,

  createAt: `lg:text-2xl lg:pl-1`,

  pageNo: `flex-none h-20 w-20 border-0 border-black flex flex-col justify-center items-center text-2xl pr-1
  md:h-36 md:w-36 md:text-5xl md:font-bold md:ml-4
   lg:fixed lg:right-0 lg:top-0 lg:invisible`,

  pageNoLong: `hidden lg:fixed lg:right-10 lg:top-7  lg:text-7xl lg:font-bold lg:block lg:tracking-widest`,
};