import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

type propsType = {
    statusCode: number | null
}


const AfterCreationPopUp = (props:propsType):JSX.Element => {

    const [counter, setCounter] = useState<number>(5);
    const { push } = useRouter();

    const { statusCode } = props;
        
    let _counter = 10;
    useEffect(() => {
        setInterval(() => {   
            setCounter((prevState) => (prevState === 0 ? 0 : prevState - 1));
            if (--_counter === 0){
                push("/");
            }
        }, 1000);  
    }, []);

    let displayMessage = '';
    if (statusCode !== 204) {
      displayMessage = `Fail to Create Quiz (status = ${statusCode}). Please try again later`;
    } else {
      displayMessage = `Quiz  Created !`;
    }

    return (
      <div className={style.afterCreationPopUp}>
        <div className={style.messageBox}>
        <p className={style.message}>{displayMessage}</p>
        <p className={style.counter}> Redirecting to home page in {counter} seconds. </p>
        </div>
      </div>
    );
}

export default AfterCreationPopUp;

const style = {
  afterCreationPopUp: `fixed top-0 left-0 w-screen h-screen bg-gray-300/50 overflow-hidden z-50 flex flex-col justify-center items-center `,
  messageBox: `w-2/5 pb-10 pt-10 border-2 border-gray-300 bg-white rounded-xl p-4`,
  message: 
  `text-xl w-full text-center font-black
  md:text-2xl `,
  counter: `text-sm w-full text-center
   md:text-xl`,
};