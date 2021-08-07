import * as React from 'react';

import { IUserData } from 'common/models';
import { quizzes } from 'common/questions';
import { getAppStateLocalStorageName } from 'common/utils';
import { Quizzes } from 'components/Quizzes';
import { Result } from 'components/Result';
import { UserData } from 'components/UserData';
import * as scheme from 'images/scheme.jpg';
import { IAppProps, IAppState } from './models';

const defaultState: IAppState = {
  userData: {
    name: '',
    surname: '',
    group: '',
  },
  authorized: false,
  quizzesStarted: false,
  stopQuizzes: false,
  stopQuizzesPassword: '',
  showScheme: false,
};

export class App extends React.PureComponent<IAppProps, IAppState> {
  state: IAppState = defaultState;

  componentWillMount() {
    const stateJSONString = localStorage.getItem(getAppStateLocalStorageName());

    if (!stateJSONString) {
      return;
    }

    try {
      const state = JSON.parse(stateJSONString) as IAppState;
      this.setState(state);
    } catch (error) {
      console.error('Error occurred during localStorage parsing (app state).', error);
    }
  }

  private updateStateAndLocalStorage = (state: Partial<IAppState>): void => {
    this.setState(
      state as IAppState,
      () => {
        localStorage.setItem(getAppStateLocalStorageName(), JSON.stringify(this.state));
      },
    );
  }

  private start = (userData: IUserData): void => {
    this.updateStateAndLocalStorage({
      userData,
      authorized: true,
      quizzesStarted: true,
    });
  }

  private finish = (): void => {
    this.updateStateAndLocalStorage({
      quizzesStarted: false,
    });
  }

  private onStopQuizzesPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.updateStateAndLocalStorage({
      stopQuizzesPassword: event.target.value,
    });
  }

  private onStopQuizzesClick = (): void => {
    this.updateStateAndLocalStorage({
      stopQuizzes: true,
    });
  }

  private onCancelStopQuizzesClick = (): void => {
    this.updateStateAndLocalStorage({
      stopQuizzes: false,
      stopQuizzesPassword: '',
    });
  }

  private stopQuizzes = (): void => {
    const { stopQuizzesPassword } = this.state;

    if (stopQuizzesPassword === '12321') {
      localStorage.clear();
      this.setState(defaultState);
    }
  }

  private onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      this.stopQuizzes();
    }
  }

  private showScheme = (): void => {
    this.updateStateAndLocalStorage({
      showScheme: true,
    });
  }

  private hideScheme = (): void => {
    this.updateStateAndLocalStorage({
      showScheme: false,
    });
  }

  private getScheme = (): JSX.Element => {
    const { showScheme } = this.state;
    const buttonText = showScheme ? 'Скрыть схему' : 'Показать схему';
    const buttonClick = showScheme ? this.hideScheme : this.showScheme;

    return (
      <div className={'scheme'}>
        <button onClick={buttonClick}>{buttonText}</button>
        {showScheme && <img src={scheme} alt="Схема территориально-распределённого предприятия"/>}
      </div>
    );
  }

  render() {
    // TODO: quizzesStatus
    const { authorized, quizzesStarted, stopQuizzes, stopQuizzesPassword, userData } = this.state;

    return (
      <>
        <div className={'stop-quizzes'}>
          {
            !stopQuizzes
              ? <button onClick={this.onStopQuizzesClick} className={'stop-quizzes__button'} disabled={!authorized}>Прекратить опрос</button>
              : (
                <>
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    className={'stop-quizzes__input'}
                    value={stopQuizzesPassword}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onStopQuizzesPasswordChange}
                  />
                  <button onClick={this.stopQuizzes} className={'stop-quizzes__button'} disabled={!stopQuizzesPassword}>Прекратить опрос</button>
                  <button onClick={this.onCancelStopQuizzesClick} className={'stop-quizzes__button'}>Отмена</button>
                </>
              )
          }
        </div>
        <div className={'app__quizzes-title'}>
          Настройка защищённой территориально-распределённой сети предприятия
        </div>
        {!authorized
          ? <UserData start={this.start} />
          : quizzesStarted
            ? <Quizzes quizzes={quizzes} finish={this.finish} />
            : <Result quizzesList={quizzes.map(({ title, questions }) => [title, questions.length] as [string, number])} userData={userData} />
        }
        {authorized && this.getScheme()}
      </>
    );
  }
}
