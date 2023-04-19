import { SocialIcon } from "react-social-icons";
import Link from "next/link";


const Header = ():JSX.Element => {

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <div className={style.title1}>QUIZ</div>
        <div className={style.title2}>CHALLENGE</div>
        <div className={style.hr}></div>
        <div className={style.nameWrap}>
          <div className={style.myName}>WILSONWONG</div>
          <div className={style.socialIcon}>
            <SocialIcon
              url="https://github.com/wilws/quiz_challenge"
              style={{ width: "30px", height: "30px" }}
              bgColor="transparent"
              fgColor="grey"
            />
          </div>
        </div>
        <Link href="/create">
          <button className={style.button}>ADD QUIZ</button>
        </Link>
      </div>
    </header>
  );
};


const style = {

  header: 
  `mb-5 
  md:pl-8 md:pr-8
  xl:fixed xl:top-0 xl:h-screen xl:w-1/4
  xl:max-h-screen
  xl:flex xl:flex-col xl:gap-20  xl:items-center xl:-mt-20 xl:justify-center 
  `,

  logo: 
  `w-40 
  md:w-72`,

  title1: 
  `font-sans tracking-wide font-light text-2xl translate-y-2
  md:text-4xl md:tracking-wider md:translate-y-1`,

  title2: 
  `font-sans tracking-tight font-black text-2xl mb-3
  md:text-5xl md:tracking-tighter md:mb-7`,

  hr: 
  `w-full bg-slate-400 h-0.5`,

  nameWrap: 
  `flex flex-wrap -translate-y-1`,

  myName: 
  `font-sans mr-1 text-sm  pt-1 font-semibold text-slate-500 translate-y-1
  md:text-xl md:translate-y-2`,

  socialIcon: 
  `md:translate-y-2`,

  button: 
  `fixed right-4 top-4 text-normal tracking-tighter bg-black text-white pt-2 pb-2 pl-3 pr-3 cursor-pointer 
  md:pt-4 md:pb-3 md:pl-7 md:pr-7 md:text-lg md:right-10 md:top-7
  xl:relative  xl:left-1/3 xl:top-16  xl:pl-3 xl:pr-3 xl:pt-2 xl:pb-1 `,
};

export default Header;
