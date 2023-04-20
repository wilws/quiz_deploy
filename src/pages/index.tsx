
import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuizzes } from "../request/quiz";
import Card from "../components/UI/Card";
import Header from "../components/layout/Header";
import { useEffect, useRef } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";


export default function Home(props:any) {

  const container = useRef<HTMLHeadingElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["quizzes"],
    initialData: props.quizzes,
    queryFn: ({ pageParam }) => getQuizzes(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.cursor,
  });


   useEffect(() => {

     const handleScroll = () => {
       if (!container.current) return;

       const travelDistance = window.innerHeight + window.pageYOffset;
       const triggerPoint =
         container.current.offsetTop + container.current.offsetHeight / 1.5;

       if (travelDistance >= triggerPoint) {
        fetchNextPage();
       }
     };

     window.addEventListener("scroll", handleScroll);
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);


  let quizCounter = 1;

  const LoadingComponent = () => {
    return (
      <div className="loadingPage">
        <Dimmer active inverted >
          <Loader inverted active>
            Loading
          </Loader>
        </Dimmer>
      </div>
    );
  }

  const ErrorComponent = (props:{errorMsg:string}) => {
    return (
      <div className={style.errorPage}>
        <h3>Ops!..Error !</h3>
        <pre>{props.errorMsg}</pre>
      </div>
    );
  };


  return (
    <>
      <section className={style.container}>
        <div className={style.wrapper}>
          <Header />

          <main className={style.main} ref={container}>
            {status === "loading" ? (
              <LoadingComponent />
            ) : status === "error" ? (
             <ErrorComponent errorMsg={"Error in Fetching UserData" }/>
            ) : (
              <>
                <ul className={style.ul}>
                  {data?.pages
                    .flatMap((data) => data.users)
                    .map((user) => {
                      return (
                        <Card
                          key={user.id}
                          creatorName={user.name}
                          firstQuestion={user.question[0].question}
                          quizNo={quizCounter++}
                          userId={user.id}
                        />
                      );
                    }
                    )
                  }
                </ul>

                {isFetchingNextPage && (
                  <Segment>
                    <div className={style.loader}>
                      <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                      </Dimmer>
                    </div>
                  </Segment>
                )}
              </>

            )}
          </main>
        </div>
      </section>
    </>
  );
}


// --- SSG --- /
import { fetchAllQuizzes } from "../controllers/quiz";
export async function getStaticProps() {
    const quizzes = await fetchAllQuizzes(null); 
    return {
      props: { data: JSON.parse(JSON.stringify(quizzes.data)) },
      revalidate: 10,
    };
}


// --- Tailwind Styling --- //
const style = {
  container: `z-50 w-screen h-screen p-4 relative flex flex-row justify-center items-center
  xl:flex xl:flex-row xl:h-[calc(100vh+2rem)] `,

  wrapper: `w-full h-full relative lg:max-w-screen-2xl`,

  loadingPage: `p-2`,

  errorPage: `w-full h-screen flex flex-col justify-center items-center absolute top-1/2 -translate-y-1/2`,

  main: `min-h-full w-full bg-transparent
  xl:w-3/4 xl:absolute xl:right-0 xl:top-0 xl:max-h-full xl:max:w-3/4`,

  ul: `w-full overflow-auto
  md:flex md:flex-row md:flex-wrap md:justify-start`,

  loader: `h-16`,
};

  