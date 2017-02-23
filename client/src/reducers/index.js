import update from 'immutability-helper';
import * as actions from '../actions/index';
import store from '../store';
import spacedAlgo from '../algorithm.js';
import insertionSort from '../algorithm.js';


const initialState = {
    _id: '',
    googleId: '',
    accessToken: '',
    questionHistory: 'hello',
    email: '',
    name: '',
    sessionHistory: {
        questions: 0,
        correctAnswers: 0
    },
    answerHistory: {
        questions: 0,
        correctAnswers: 0
    } 
}

export const mainReducer = (state= initialState, action) => {
    if (action.type === actions.MAP_USER_TO_STORE) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE MAP_USER_TO_STORE GETSTATE()")}, 3000);
        console.log('QUESTION HISTORY IN REDUCER ', action.userData.questionHistory);
        console.log('QUESTION HISTORY IN REDUCER  QUESTION ', action.userData.questionHistory[0].question);
        return update(state, {
            _id: {$set: action.userData._id},
            googleId: {$set: action.userData.googleId},
            accessToken: {$set: action.userData.accessToken},
            questionHistory: {$set: action.userData.questionHistory},
            email: {$set: action.userData.email},
            name: {$set: action.userData.name},
            answerHistory: {$set: action.userData.answerHistory}
        })
    }

    if (action.type === actions.SUBMIT_USER_ANSWER_TO_ALGO) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SUBMIT_USER_ANSWER_TO_ALGO GETSTATE()")}, 3000);
        let sortedquestionHistory = spacedAlgo(action.questionHistory, action.userAnswer)
        // returns a sorted questionHistory array with updated mValue
        return update(state, {
            questionHistory: {$set: sortedquestionHistory}
        })
    }

    
    if (action.type === actions.INCREMENT_QUESTION_COUNT) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE INCREMENT_QUESTION_COUNT GETSTATE()")}, 3000);
        return update(state, {
            answerHistory: {
                questions: {$apply: function(x) {return x + 1}}},
            sessionHistory: {
                questions: {$apply: function(x) {return x + 1}}}
        })
    }

    if (action.type === actions.INCREMENT_CORRECT_COUNT) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE INCREMENT_CORRECT_COUNT GETSTATE()")}, 3000);
        return update(state, {
            answerHistory: {
                correctAnswers: {$apply: function(x) {return x + 1}}},
            sessionHistory: {
                correctAnswers: {$apply: function(x) {return x + 1}}}
        })
    }

    // onSubmit() {
    //     dispatch INCREMENT_QUESTION_COUNT
    //     dispatch SUBMIT_USER_ANSWER_TO_ALGO
    //      if (userInput === this.props.questionHistory[0].answer) {
    //         dispatch incrementCorrectCount
    //     }
    // }



	return state;
}










//serve question

// Front end
// [1,1,1,1,1,1,1,1,1]
// --dispatch action to check input vs answer
// --update m values accordingly using algorithm
// -reorder by m value

// implied 
// [1,2,1,2,2,1,2,1,1]

// reorder by m value
// [1,1,1,1,2,2,2,2]

// Backend
// onClick logout
// dispatch > update User.John = store;
// dispatch > update User.john.questionHistory = store.questionHistory;


// -Rendering state items in components (need order of questions)
// -Correct or Incorrect component
// -Frontend session counter - created action, just need to call
//     -Set to 0 in initial state
//     -On correct answer, dispatch action to increment sessionCounter
// -Backend lifetime counter - created action, just need to call
//     -Add correctCounter to schema, set to 0 by default for new userData
//     -Map it over to the store 
//     -On correct answer, dispatch action to increment correctCounter
// -Algorithm
//     -Do it
// -Update DB on logout    
//     -dispatch async action (get or put)?




