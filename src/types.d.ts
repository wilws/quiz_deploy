type Question = {
    id: number;
    question: string;
    answer: string;
    createId: number;
    createdAt: string;
}

type User = {
  id: number;
  name: string;
  createdAt: string;
  question?: [] | Array<Question>;
};


type Quiz = {
    users: Array<User>;
    count: number;
    cursor: string;
}

