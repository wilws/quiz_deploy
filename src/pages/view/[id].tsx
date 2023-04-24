import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "@/request/quiz";
import { paramIdSanitiser, parsingUserData } from "../../utils/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import  QuestionDisplay  from "@/components/view/QuestionDisplay";
import ResultDisplay from "@/components/view/ResultDisplay";
import { Dimmer, Loader } from "semantic-ui-react";
import { gradientColorGenerator } from "@/utils/helper";
import { useEffect ,useRef } from "react";
import ErrorPage from "@/components/view/ErrorPage";
import { GetStaticProps } from "next";
import { fetchAllQuizzes,fetchQuiz } from "@/controllers/quiz";

type PropsType = {
  data:User;
}

const ViewQuiz = (props: PropsType) => {

  const router = useRouter();
  const [answerList, setAnswerList] = useState<Array<boolean>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const divRef = useRef<HTMLDivElement>(null);

  const quiz = useQuery({
    queryKey: ["quiz", paramIdSanitiser(router.query.id)],
    queryFn: () => getQuiz(paramIdSanitiser(router.query.id)),
    initialData: props.data,
    enabled: router.isReady,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const colors = gradientColorGenerator(paramIdSanitiser(router.query.id));
    setTimeout(() => {
      if (divRef.current) {
        divRef.current.style.background = `linear-gradient(${colors[0]} 10%,${colors[1]}) 90%`;
      }
    }, 100);
  }, [divRef, router.isReady, router.query.id]);

  // if (quiz.status === "loading") {
  //   return (
  //     <div>
  //       <Dimmer active inverted>
  //         <Loader inverted>Loading</Loader>
  //       </Dimmer>
  //     </div>
  //   );
  // }

  if (quiz.status === "error") {
    return <ErrorPage errorMsg={"Error in Fetching UserData"} />;
  }

  const { data } = quiz;
  if (!data) return <ErrorPage errorMsg={"No user is found"} />;

  let questionKey = 1;
  const markingList: Array<string> = [];


  return (
    <div className={style.viewPage} ref={divRef}>
      <div className={style.wrapper}>
        <header className={style.header}>
          <div className={style.quizNo}>
            <span>Q{router.query.quizNo}</span>
          </div>

          <div className={style.createInfo}>
            <span className={style.creatorIntro}>
              This Quiz is created by
            </span>

            <div className={style.creator}>{data?.name}</div>
            <div className={style.createAt}>
              {data?.createdAt.split("T")[0]}
            </div>
          </div>

          <div className={style.pageNo}>
            <span> {currentPage < 4 ? `${currentPage}/3` : "Result"} </span>
          </div>
        </header>

        <main className={style.main}>
          <div className={style.pageNoLong}>
            <span>
              {currentPage < 4 ? `Question ${currentPage}` : "Result"}
            </span>
          </div>

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
            question={data?.question}
            answerList={answerList}
            markingList={markingList}
          />
        </main>
      </div>
    </div>
  );
};

export default ViewQuiz;



export const getStaticProps:GetStaticProps  = async ({ params }: any) => {

  let quizId: string | null;
  if (!params?.id) return {props:{data:null}}

  quizId = params.id;
  const _data  = await fetchQuiz(Number(quizId));
  const data = parsingUserData(_data.data);

  return {
    props: {
      data: {
        id: quizId,
        name: data.name,
        createdAt: data.createdAt,
        question: data.question,
      },
    },
  };
}




export const getStaticPaths = async () => {

  const quizzes = await fetchAllQuizzes(null);
  const quizzesArray = JSON.parse(JSON.stringify(quizzes.data.users));

  type pathType = {
    params: {
      id: string;
    };
  };

  const paths: Array<pathType> = [];

  quizzesArray.forEach((quiz: User) => {
    paths.push({
      params: {
        id: quiz.id.toString(),
      },
    });
  });

  return {
    paths,
    fallback: true,
  };
};





const style = {

  viewPage: `w-screen h-screen flex flex-col items-center justify-center`,

  wrapper: `w-full h-full flex flex-col items-center overflow-hidden
  lg:flex lg:flex-row lg:justify-center lg:relative lg:max-w-screen-2xl `,

  header: `border-b-2  border-b-black w-full p-2 flex flex-row h-26 justify-between gap-4
  md:h-48 md:p-5
  lg:absolute lg:left-0 lg:top-0
  lg:h-full lg:flex lg:flex-col lg:justify-between lg:w-1/5 lg:border-0
  lg:pb-20
  `,

  main: `grow  w-full overflow-auto
  lg:h-full lg:w-screen  lg:relative `,

  quizNo: `flex-none h-20 w-20 border-2 border-black flex flex-col justify-center items-center text-2xl
  md:h-36 md:w-36 md:text-5xl md:font-bold md:border-4  md:mr-4
  lg:h-32 lg:w-32 lg:text-4xl  lg:border-2
 `,

  createInfo: `flex-1 flex flex-col justify-center text-center border-l-2 border-r-2 border-black-100 rounded-sm tracking-wider uppercase 
  md:text-4xl
  lg:border-0 lg:items-baseline lg:justify-end `,

  creatorIntro: `hidden lg:block lg:text-sm lg:tracking-tight lg:translate-y-1`,
  creator: `translate-y-1
  lg:text-5xl lg:text-left lg:font-black`,

  createAt: `lg:text-2xl lg:pl-1 lg:mt-2 lg:text-sm`,

  pageNo: `flex-none h-20 w-20 border-0 border-black flex flex-col justify-center items-center text-2xl pr-1
  md:h-36 md:w-36 md:text-5xl md:font-bold md:ml-4
   lg:fixed lg:right-0 lg:top-0 lg:invisible`,

  pageNoLong: `hidden 
  lg:fixed lg:right-10 lg:top-7  lg:text-5xl lg:font-bold lg:block lg:tracking-wider`,
};