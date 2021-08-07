import { AnswerStatus } from 'common/constants';
import { IQuiz } from 'common/models';

export interface IQuizProps {
  quiz: IQuiz;
  finish(): void;
}

export interface IQuizState {
  questionsAmount: number;
  currentQuestionNumber: number;
  answer: string;
  answerStatus: AnswerStatus;
}
