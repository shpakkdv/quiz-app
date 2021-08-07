import * as React from 'react';

import { IQuizzesListProps, IQuizzesListState } from './models';

export class QuizzesList extends React.PureComponent<IQuizzesListProps, IQuizzesListState> {
  render() {
    const { quizzesList, passedNumber } = this.props;

    return (
      <div>
        {quizzesList.map((quizTitle, index) => {
          let className = '';
          if (index + 1 <= passedNumber) {
            className = 'quizzes-list__passed-item';
          } else if (index === passedNumber) {
            className = 'quizzes-list__current-item';
          }

          return (
            <div key={quizTitle} className={className}>
              {`${index + 1}. ${quizTitle}`}
            </div>
          );
        })}
      </div>
    );
  }
}
