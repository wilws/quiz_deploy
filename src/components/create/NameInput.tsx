import React, { useEffect, useRef } from "react";


type PropType = {
  creatorName: string;
  setCreatorName: (creatorName: string) => void;
  pageNo: number;
  currentPage: number
  setCurrentPage: (pageNo: number) => void;
};

const NameInput = (props: PropType):JSX.Element => {

  const { creatorName, setCreatorName, pageNo, setCurrentPage, currentPage } = props;
  const nameRef = useRef<HTMLInputElement>(null);


  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
      setCreatorName(event?.target.value);
  }  

  return (
    
    <>
      { (currentPage == pageNo) && (
          <>
      <label htmlFor="creatorName">Input Your name</label>
      <h1>{creatorName}</h1>
      <br />
      <input
        ref={nameRef}
        type="text"
        name="creatorName"
        id="creatorName"
        placeholder="Input Your Name"
        value={creatorName}
        onChange={onChangeHandler}
      />
      <br></br>

      <button
        onClick={() => {
          setCurrentPage(pageNo + 1);
        }}
      >
        Next
      </button>
     </> )}
    </>
  );
};

export default NameInput