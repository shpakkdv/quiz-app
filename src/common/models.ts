import { CLI } from './constants';

export interface IUserData {
  name: string;
  surname: string;
  group: string;
}

interface IQuestion {
  precondition: CLI;
  question: string;
  answer: string;
}

export type IQuestions = IQuestion[];

export interface IQuiz {
  title: string;
  questions: IQuestions;
}

export type IQuizzes = IQuiz[];
