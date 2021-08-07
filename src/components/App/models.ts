import { IUserData } from 'common/models';

export interface IAppProps {}

export interface IAppState {
  userData: IUserData;
  authorized: boolean;
  quizzesStarted: boolean;
  stopQuizzes: boolean;
  stopQuizzesPassword: string;
  showScheme: boolean;
}
