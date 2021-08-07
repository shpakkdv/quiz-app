import * as React from 'react';

import { AnswerStatus, AnswerMessage, AnswerMessageStyle } from 'common/constants';
import { getQuizAnswersLocalStorageName, getQuizStateLocalStorageName } from 'common/utils';
import { IQuizProps, IQuizState } from './models';

export class Quiz extends React.PureComponent<IQuizProps, IQuizState> {
  state: IQuizState = {
    questionsAmount: this.props.quiz.questions.length,
    currentQuestionNumber: 1,
    answer: '',
    answerStatus: AnswerStatus.DID_NOT_CHECK,
  };

  componentWillMount() {
    const { title } = this.props.quiz;

    const stateJSONString = localStorage.getItem(getQuizStateLocalStorageName(title));

    if (!stateJSONString) {
      return;
    }

    try {
      const state = JSON.parse(stateJSONString) as IQuizState;
      this.setState(state);
    } catch (error) {
      console.error(`Error occurred during localStorage parsing (quiz state - ${title}).`, error);
    }
  }

  private updateStateAndLocalStorage = (state: Partial<IQuizState>): void => {
    const { title } = this.props.quiz;

    this.setState(
      state as IQuizState,
      () => {
        localStorage.setItem(getQuizStateLocalStorageName(title), JSON.stringify(this.state));
      },
    );
  }

  private updateQuizResultInLocalStorage = (isAnswerCorrect: boolean): void => {
    const { title } = this.props.quiz;
    const itemName = getQuizAnswersLocalStorageName(title, isAnswerCorrect);

    const count = Number(localStorage.getItem(itemName) || 0);

    localStorage.setItem(itemName, String(count + 1));
  }

  private onAnswerChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.updateStateAndLocalStorage({
      answer: event.target.value,
    });
  }

  private onCheckClick = (): void => {
    const { questions } = this.props.quiz;
    const { answer, currentQuestionNumber } = this.state;
    const trimmedAnswer = answer.trim();

    if (!trimmedAnswer) {
      return;
    }

    const isAnswerCorrect = trimmedAnswer === questions[currentQuestionNumber - 1].answer;

    this.updateStateAndLocalStorage({
      answerStatus: isAnswerCorrect ? AnswerStatus.CORRECT : AnswerStatus.INCORRECT,
    });

    if (isAnswerCorrect) {
      this.updateQuizResultInLocalStorage(true);
    }
  }

  private onNextClick = (): void => {
    const { currentQuestionNumber, questionsAmount } = this.state;

    if (currentQuestionNumber === questionsAmount) {
      this.props.finish();
    } else {
      this.updateStateAndLocalStorage({
        currentQuestionNumber: currentQuestionNumber + 1,
        answer: '',
        answerStatus: AnswerStatus.DID_NOT_CHECK,
      });
    }
  }

  private onShowAnswerClick = (): void => {
    this.updateStateAndLocalStorage({
      answerStatus: AnswerStatus.SHOW_ANSWER,
    });

    this.updateQuizResultInLocalStorage(false);
  }

  private onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      this.onCheckClick();
    }
  }

  render() {
    const { questions, title } = this.props.quiz;
    const { currentQuestionNumber, questionsAmount, answerStatus, answer } = this.state;
    const { question, precondition, answer: correctAnswer } = questions[currentQuestionNumber - 1];
    const answerMessage = answerStatus === AnswerStatus.SHOW_ANSWER ? correctAnswer : AnswerMessage[answerStatus];
    const canMoveNext = [AnswerStatus.CORRECT, AnswerStatus.SHOW_ANSWER].includes(answerStatus);

    return (
      <div>
        <div className={'quiz-title'}>{title}</div>
        <div className={'questions-amount'}>{`Текущий вопрос: ${currentQuestionNumber}. Всего вопросов: ${questionsAmount}`}</div>
        <p>{question}</p>
        <div className={'quiz-input'}>
          <span>{precondition}</span>
          <input type="text" onChange={this.onAnswerChange} value={answer} disabled={canMoveNext} onKeyPress={this.onKeyPress} />
        </div>
        {answerMessage &&
          <div className={`answer-message answer-message__${AnswerMessageStyle[answerStatus]}`}>{answerMessage}</div>
        }
        <div className={'quiz-buttons'}>
          <button onClick={this.onCheckClick} disabled={canMoveNext || !answer}>Проверить</button>
          <button onClick={this.onNextClick} disabled={!canMoveNext}>Далее</button>
        </div>
        <div className={'show-answer'}>
          <div>Показать правильный ответ (вопрос не будет защитан)</div>
          <button onClick={this.onShowAnswerClick} disabled={canMoveNext}>Показать ответ</button>
        </div>
      </div>
    );
  }
}
