


const Background = (): JSX.Element => {

    return (
      <div className="background">
        <div className="obj obj1"></div>
        <div className="obj obj2"></div>
        <div className="obj obj3"></div>
      </div>
    );
}

export default Background;

const style = {
  background: `w-screen h-screen bg-white fixed z-50`,

  obj1: `obj1`,
  obj2: `w-44 h-44 bg-red-500 rounded-full`,
  obj3: `w-44 h-44 bg-blue-900 rounded-full`,
};