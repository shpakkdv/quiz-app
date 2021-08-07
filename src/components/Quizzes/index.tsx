import * as React from 'react';

import { getQuizzesStateLocalStorageName } from 'common/utils';
import { Quiz } from 'components/Quiz';
import { QuizzesList } from 'components/QuizzesList';
import { IQuizzesProps, IQuizzesState } from './models';

export class Quizzes extends React.PureComponent<IQuizzesProps, IQuizzesState> {
  state: IQuizzesState = {
    quizStarted: false,
    currentQuizNumber: 1,
    quizAmount: this.props.quizzes.length,
    quizzesList: this.props.quizzes.map(({ title }) => title),
  };

  componentWillMount() {
    const stateJSONString = localStorage.getItem(getQuizzesStateLocalStorageName());

    if (!stateJSONString) {
      return;
    }

    try {
      const state = JSON.parse(stateJSONString) as IQuizzesState;
      this.setState(state);
    } catch (error) {
      console.error('Error occurred during localStorage parsing (quizzes state).', error);
    }
  }

  private updateStateAndLocalStorage = (state: Partial<IQuizzesState>): void => {
    this.setState(
      state as IQuizzesState,
      () => {
        localStorage.setItem(getQuizzesStateLocalStorageName(), JSON.stringify(this.state));
      },
    );
  }

  private onStartQuizClick = (): void => {
    const { currentQuizNumber, quizAmount } = this.state;

    if (currentQuizNumber > quizAmount) {
      this.props.finish();
    } else {
      this.updateStateAndLocalStorage({
        quizStarted: true,
      });
    }
  }

  private finish = (): void => {
    const { currentQuizNumber } = this.state;

    this.updateStateAndLocalStorage({
      currentQuizNumber: currentQuizNumber + 1,
      quizStarted: false,
    });
  }

  private getButtonName = (): string => {
    const { currentQuizNumber, quizAmount } = this.state;

    if (currentQuizNumber === 1) {
      return 'Начать';
    } else if (currentQuizNumber > quizAmount) {
      return 'Завершить';
    }

    return 'Продолжить';
  }

  render() {
    const { quizzes } = this.props;
    const { currentQuizNumber, quizzesList, quizStarted } = this.state;

    return (
      <div>
        {
          quizStarted
            ? <Quiz quiz={quizzes[currentQuizNumber - 1]} finish={this.finish} />
            : <QuizzesList quizzesList={quizzesList} passedNumber={currentQuizNumber - 1} />
        }
        {!quizStarted && <div className={'next-quiz'}><button onClick={this.onStartQuizClick}>{this.getButtonName()}</button></div>}
      </div>
    );
  }
}
