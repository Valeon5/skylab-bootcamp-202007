import actionTypes from './actionTypes';
import dispatcher from './../AppDispatcher';

export function loadQuestion(i){
    let result = i;

    dispatcher.dispatch({
        type: actionTypes.GET_QUESTION_FROM_SESSION,
        data: result
    })
}