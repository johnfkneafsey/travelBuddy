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
    let questionDatabase = this.props.questionHistory;
    let language = this.props.selectedLanguage;
    let currentAnswer;
    let bottomLanguage;
    if (this.props.languageFlipper % 2 === 0) { 
      currentAnswer = questionDatabase[language][0]['answer'];
    } else {
      currentAnswer = questionDatabase[language][0]['question'];
    }   
    let userGuess = (this.refs.userGuess).value.toLowerCase();

    this.props.dispatch(actions.previousAnswer(currentAnswer));
    this.props.dispatch(actions.incrementQuestionCount());
    if (userGuess === currentAnswer) {
      this.props.dispatch(actions.feedback("That's correct, the answer was "))
      this.props.dispatch(actions.incrementCorrectCount());
    } else {
      this.props.dispatch(actions.feedback("That's incorrect, the answer was "))
    }
    this.props.dispatch(actions.submitUserAnswerToAlgo(this.props.questionHistory[language], userGuess, language, this.props.languageFlipper))
    this.refs.userGuess.value = "";
}

  render() {

    let bottomLanguage;
    if (this.props.languageFlipper % 2 === 0) { 
      bottomLanguage = this.props.selectedLanguage.toUpperCase();
    } else {
      bottomLanguage = "English"
    }



    return (
      <div className="english center">
        <h3 className="englishtext">...in {bottomLanguage}?</h3>
        <form onSubmit={this.submitAnswer}>
          <input type="text" placeholder="Enter an answer" ref="userGuess" />
          <button className="btn daisy">Submit</button>
          <h3>{this.props.feedback}</h3>
          <h3>{this.props.previousAnswer}</h3>
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
    answerHistory: state.answerHistory,
    feedback: state.feedback,
    previousAnswer: state.previousAnswer,
    selectedLanguage: state.selectedLanguage,
    languageFlipper: state.languageFlipper
});

export default connect(mapStateToProps)(AnswerInput);
