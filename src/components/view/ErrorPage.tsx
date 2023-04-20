import Link from "next/link";

const ErrorPage = (props: { errorMsg: string }): JSX.Element => {
  return (
    <div className={style.errorPage}>
      <pre>{props.errorMsg}</pre>
      <Link href="/">
        <button type="button" className={style.errorPageBtn}>
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;

const style = {
  errorPage: `z-50 relative w-screen h-screen  flex flex-col justify-center items-center
  md:text-3xl `,

  errorPageBtn: 
  `cursor-pointer mt-3 cursor-pointer  border-2 border-black rounded-lg text-black pt-2 pb-2 pl-2 pr-2
  md:mt-10 md:text-xl`,
};
