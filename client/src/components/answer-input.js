import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';

export class AnswerInput extends React.Component {
  constructor(props) {
    super(props);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  submitAnswer(e) {
     e.preventDefault();
     let userGuess = this.userGuess.value;
     this.props.dispatch(actions.incrementQuestionCount());
     console.log('ANSWER ', this.props.questionHistory[0].answer);
     if (userGuess === this.props.questionHistory[0].answer) {
        alert(`Correct! The answer is ${this.props.questionHistory[0].answer}!`);
        this.props.dispatch(actions.incrementCorrectCount());
     } else {
        alert(`Incorrect! The correct answer is ${this.props.questionHistory[0].answer}!`);
     }
     this.props.dispatch(actions.submitUserAnswerToAlgo(this.props.questionHistory, userGuess))
}

  render() {
    return (
      <div className="english">
        <h3>...in English?</h3>
        <form onSubmit={this.submitAnswer}>
          <input type="text" placeholder="Enter an answer" ref={ref => this.userGuess = ref} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    _id: state._id,
    googleId: state.googleId,
    accessToken: state.accessToken,
    questionHistory: state.questionHistory,
    email: state.email,
    name: state.name,
    answerHistory: state.answerHistory  
});

export default connect(mapStateToProps)(AnswerInput);
