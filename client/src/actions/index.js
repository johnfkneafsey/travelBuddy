import store from '../store'

// Unused actions

// After answer is submitted
// -dispatch submitUserAnswerToAlgo(userAnswer, questionHistory) questionHistory will be this.props.questionHistory. It should be an array of objects (question,answer,mValue)
// this.props.dispatch(action.submitUserAnswerToAlgo(userinput, this.props.questionHistory))


// After answer is submitted
//  -dispatch incrementQuestionCount()
// If correct answer is submitted



//    if (userInput === this.props.questionHistory[0].answer) {
//          dispatch incrementCorrectCount()
//    }




export const MAP_USER_TO_STORE = 'MAP_USER_TO_STORE';
export const mapUserToStore = (userData) => ({
	type: MAP_USER_TO_STORE,
	userData: userData
})

export const SUBMIT_USER_ANSWER_TO_ALGO = 'SUBMIT_USER_ANSWER_TO_ALGO';
export const submitUserAnswerToAlgo = (questionHistory, userAnswer) => ({
	type: SUBMIT_USER_ANSWER_TO_ALGO,
    questionData: questionHistory,
    userAnswer: userAnswer
})

export const INCREMENT_QUESTION_COUNT = 'INCREMENT_QUESTION_COUNT';
export const incrementQuestionCount = () => ({
	type: INCREMENT_QUESTION_COUNT,
})

export const INCREMENT_CORRECT_COUNT = 'MAP_USER_TO_STORE';
export const incrementCorrectCount = () => ({
	type: INCREMENT_CORRECT_COUNT,
})





