
import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuizzes } from "../request/quiz";
import Card from "../components/UI/Card";
import Header from "../components/layout/Header";
import { useEffect, useRef } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";



export default function Home() {

  const container = useRef<HTMLHeadingElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["quizzes"],

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

  return (
    <div className={style.container}>
      <Header />

      <main className={style.main} ref={container}>
        {status === "loading" ? (
          <div className="loadingPage">
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </div>
        ) : status === "error" ? (
          <pre>{JSON.stringify(error)}</pre>
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
                })}
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
  );
}

const style = {

  container: 
  `w-screen h-screen p-4 relative
  xl:flex xl:flex-row xl:h-[calc(100vh+2rem)]`,

  loadingPage: 
  `p-2`,

  main: 
  `min-h-full w-full
  xl:w-3/4 xl:absolute xl:right-0 xl:top-0 xl:max-h-full xl:max:w-3/4`,

  ul: 
  `w-full overflow-auto
  md:flex md:flex-row md:flex-wrap md:justify-start`,

  loader: 
  `h-16`,
};

  
    /* <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          load more
        </button> */
  