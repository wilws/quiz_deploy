


type PropType = {
    creatorName: string;
    pageNo: number;
    currentPage: number;
    setCurrentPage: (pageNo: number) => void;
    questions: Array<QuestionAnswer>;
}

const ConfirmPage = (props:PropType) => {

    const {creatorName, questions, pageNo, currentPage, setCurrentPage } = props;

    let questionKey = 0;
    return (
      <>
        {currentPage == pageNo && (

          <section>
            <h3>name : {creatorName}</h3>

            {
                questions.map((q) => {
                    return <div key={questionKey++}>
                        {q.question} - {q.answer? "yes":"no"}
                    </div>
                })
            }

            <button
              onClick={() => {
                setCurrentPage(4);
              }}
            >
              Back
            </button>
            <button type="submit" value="Submit">
              Confirm
            </button>
          </section>
          
        )}
      </>
    );
}

export default ConfirmPage;