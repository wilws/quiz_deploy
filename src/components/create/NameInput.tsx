import React from "react";
import Link from 'next/link';


type PropType = {
  creatorName: string;
  setCreatorName: (creatorName: string) => void;
  pageNo: number;
  currentPage: number
  setCurrentPage: (pageNo: number) => void;
};

const NameInput = (props: PropType):JSX.Element => {

  const { creatorName, setCreatorName, pageNo, setCurrentPage, currentPage } = props;


  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
      setCreatorName(event?.target.value);
  }  

  if (currentPage !== pageNo) return (<></>);
  return (
    <div className={style.nameInputPage}>
      <p className={style.p}>
        <span>
          Hey! <br /> Please tell me your name.
        </span>
      </p>
      <input
        className={style.input}
        // ref={nameRef}
        type="text"
        name="creatorName"
        id="creatorName"
        placeholder="Your Name"
        value={creatorName}
        onChange={onChangeHandler}
      />

      <div className={style.buttonGroup}>
        <Link href="/">
          <button className={style.exitButton}>Back</button>
        </Link>

        <button
          className={creatorName ? style.button : style.buttonDisable}
          onClick={() => {
            setCurrentPage(pageNo + 1);
          }}
          disabled={!creatorName}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};



export default NameInput


const style = {
  nameInputPage: `
  z-50
  w-full hf-full flex flex-col  items-center
  md:pt-20`,
  p: `w-full h-60 text-2xl text-center flex flex-col justify-center items-center
  md:text-4xl md:tracking-wider md:font-thin md:leading-loose`,
  input: `focus:outline-none bg-transparent border-b-2 border-red  w-3/4 h-12 text-center text-xl mb-20 max-w-lg
  md:text-4xl uppercase md:mt-20 md:mb-40`,
  buttonGroup: `w-4/5 flex flex-row justify-between`,

  exitButton: `border-2 border-red cursor-pointer tracking-widest  w-40 bg-black text-white h-10 rounded-xl
  md:w-64 md:h-16 md:text-3xl md:font-thin`,

  button: `border-2 border-red cursor-pointer tracking-widest  w-40 bg-black text-white h-10 rounded-xl
  md:w-64 md:h-16 md:text-3xl md:font-thin`,

  buttonDisable: ` tracking-widest  w-40 bg-gray-300 text-white h-10 rounded-xl
  md:w-64 md:h-16 md:text-3xl md:font-thin`,
};