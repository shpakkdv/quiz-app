import { IUserData } from 'common/models';

export interface IResultProps {
  quizzesList: [string, number][];
  userData: IUserData;
}

export interface IResultState {}

export interface IResults {
  [key: string]: {
    correctAnswers: number;
    incorrectAnswers: number;
  };
}
