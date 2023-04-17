type Question = {
    id: number;
    question: string;
    answer: string;
    createId: number;
    createdAt: date;
}

type User = {
  id: number;
  name: string;
  createdAt: date;
  question: Array<Question>;
};


type Quiz = {
    users: any ;
    count: number;
    cursor?: string;
}


