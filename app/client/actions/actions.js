import * as types from 'constants/actionTypes'

export function activateQuestion (id, reactive) {
  return {
    type: types.ACTIVE_QUESTION,
    id,
    reactive
  }
}

export function answerQuestion (id, answer) {
  return {
    type: types.ANSWER_QUESTION,
    id,
    answer
  }
}

export function loadForm (form) {
  return {
    type: types.LOAD_FORM,
    form
  }
}
