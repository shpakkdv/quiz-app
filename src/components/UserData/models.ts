import { IUserData } from 'common/models';

export interface IUserDataProps {
  start(userData: IUserData): void;
}

export interface IUserDataState {
  userData: IUserData;
}
