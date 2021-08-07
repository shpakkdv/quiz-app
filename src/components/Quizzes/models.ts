import { AnswerStatus } from 'common/constants';
import { IQuizzes } from 'common/models';

export interface IQuizzesProps {
  quizzes: IQuizzes;
  finish(): void;
}

export interface IQuizzesState {
  quizStarted: boolean;
  currentQuizNumber: number;
  quizAmount: number;
  quizzesList: string[];
}
