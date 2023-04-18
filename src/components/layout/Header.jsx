import { SocialIcon } from "react-social-icons";
import Link from "next/link";

const Header = () => {

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <div className={style.title1}>QUIZ</div>
        <div className={style.title2}>CHALLENGE</div>
        <div className={style.hr}></div>
        <div className={style.nameWrap}>
          <div className={style.myName}>Wilson Wong</div>
          <div className={style.socialIcon}>
            <SocialIcon
              url="https://github.com/wilws/quiz_challenge"
              style={{ height: 30 , width: 30 }}
              bgColor="transparent"
              fgColor="grey"
            />
          </div>
        </div>
      </div>

      <Link href="/create">
        <button className={style.button}>ADD QUIZ</button>
      </Link>
    </header>
  );
};


const style = {
  header: "mb-5",
  logo: " w-40",
  title1: "font-sans tracking-wide font-light text-2xl translate-y-1 ",
  title2: "font-sans tracking-tight font-black text-2xl mb-3",
  hr: "w-full bg-slate-800 h-0.5",
  nameWrap: "flex flex-wrap translate-y-0",
  myName: "font-sans mr-1 text-sm  pt-1 font-semibold text-slate-500",
  socialIcon: "",
  button:
    "fixed right-4 top-4 text-normal tracking-tighter bg-black text-white pt-2 pb-2 pl-3 pr-3 cursor-pointer",
};

export default Header;
