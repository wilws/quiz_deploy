type Question = {
    id: number;
    question: string;
    answer: string;
    creatorId: number;
    createdAt: date;
}

type User = {
  id: number;
  name: string;
  createdAt: date;
  question: Array<Question>;
};


type Quiz = {
  message?:string;
  users: any ;
  count: number;
  cursor?: string;
}


type QuestionAnswer = {
    question: string;
    answer: boolean;
}

// Applied in src/request/quiz.tsx
// createQuiz()
type QuizInput = {
  creatorName: string;
  questions: Array<QuestionAnswer>;
};
