import Head from 'next/head';
import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuizzes } from "../request/quiz";

export default function Home() {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["quiz"],

    queryFn: ({ pageParam }) => getQuizzes(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.cursor,
  });

  return (
    <>
      <Head>
        <title>CarbonCode NextJS Tech Test</title>
      </Head>
      <main>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          load more
        </button>

        {data?.pages
          .flatMap((data) => data.users)
          .map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
      </main>
    </>
  );
}
