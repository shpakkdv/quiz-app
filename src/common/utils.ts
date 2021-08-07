export function getAppStateLocalStorageName() {
  return 'APP_STATE';
}

export function getQuizzesStateLocalStorageName() {
  return 'QUIZZES_STATE';
}

export function getQuizStateLocalStorageName(quizTitle: string) {
  return `QUIZ_STATE_${quizTitle}`;
}

export function getQuizAnswersLocalStorageName(quizTitle: string, correctAnswers: boolean) {
  return `QUIZ_RESULT_${correctAnswers ? 'CORRECT' : 'INCORRECT'}_ANSWERS_${quizTitle}`;
}
