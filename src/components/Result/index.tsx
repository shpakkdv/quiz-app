import * as React from 'react';

import { getQuizAnswersLocalStorageName } from 'common/utils';
import { IResultProps, IResultState, IResults } from './models';

export class Result extends React.PureComponent<IResultProps, IResultState> {
  private getResults = (): IResults => {
    const { quizzesList } = this.props;

    return quizzesList.reduce(
      (results, [quizTitle]) => {
        const correctAnswers = Number(localStorage.getItem(getQuizAnswersLocalStorageName(quizTitle, true)) || 0);
        const incorrectAnswers = Number(localStorage.getItem(getQuizAnswersLocalStorageName(quizTitle, false)) || 0);

        results[quizTitle] = {
          correctAnswers,
          incorrectAnswers,
        };

        return results;
      },
      {} as IResults,
    );
  }

  render() {
    const { quizzesList, userData: { name, surname, group } } = this.props;
    const results = this.getResults();

    let allQuestionsAmount = 0;
    let allCorrectAnswers = 0;
    let allIncorrectAnswers = 0;

    return (
      <>
        <div className={'results__user-data'}>{`${name} ${surname}, гр. ${group}`}</div>

        {quizzesList.map(([quizTitle, questionAmount], index) => {
          const { correctAnswers, incorrectAnswers } = results[quizTitle];

          allQuestionsAmount += questionAmount;
          allCorrectAnswers += correctAnswers;
          allIncorrectAnswers += incorrectAnswers;

          return (
            <div key={quizTitle} className={'results__quiz'}>
              <div className={'results__quiz-title'}>{`${index + 1}. ${quizTitle}`}</div>
              <div className={'results__quiz-statistic'}>
                <div>{`Всего вопросов: ${questionAmount}`}</div>
                <div className={'results__quiz-statistic_correct'}>{`Отвечено правильно: ${correctAnswers}`}</div>
                <div className={'results__quiz-statistic_incorrect'}>{`Неотвечено: ${incorrectAnswers}`}</div>
              </div>
            </div>
          );
        })}

        <div className={'common-result'}>
          <div>{'Всего вопросов: '}<b>{allQuestionsAmount}</b></div>
          <div>{'Всего правильных ответов: '}<b>{allCorrectAnswers}</b></div>
          <div>{'Всего неотвеченных вопросов: '}<b>{allIncorrectAnswers}</b></div>
          <div>{'Процент правильно отвеченных вопросов: '}<b>{`${Math.round(allCorrectAnswers * 100 / allQuestionsAmount)}%`}</b></div>
        </div>
      </>
    );
  }
}
