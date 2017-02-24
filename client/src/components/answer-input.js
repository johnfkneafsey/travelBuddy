import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';

export class AnswerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        previousAnswer : "",
        feedback: ""
    }
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  submitAnswer(e) {
     e.preventDefault();
     let userGuess = (this.refs.userGuess).value.toLowerCase();
     this.setState({previousAnswer: this.props.questionHistory[0].answer})
     this.props.dispatch(actions.incrementQuestionCount());
     console.log('ANSWER ', this.props.questionHistory[0].answer);
     if (userGuess === this.props.questionHistory[0].answer) {
        this.setState({feedback: "Correct! The answer is"})
        //alert(`Incorrect! The answer is ${this.props.questionHistory[0].answer}!`);
        this.props.dispatch(actions.incrementCorrectCount());
     } else {
        this.setState({feedback: "Incorrect! The answer is"})
        //alert(`Incorrect! The correct answer is ${this.props.questionHistory[0].answer}!`);
     }
     this.props.dispatch(actions.submitUserAnswerToAlgo(this.props.questionHistory, userGuess))
     this.refs.userGuess.value = "";
}
//ref={ref => this.userGuess = ref}
  render() {
    return (
      <div className="english">
        <h3>...in English?</h3>
        <form onSubmit={this.submitAnswer}>
          <input type="text" placeholder="Enter an answer" ref="userGuess" />
          <button>Submit</button>
          <h3>{this.state.feedback} {this.state.previousAnswer}</h3>
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
