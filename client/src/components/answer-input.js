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

    let currentSessionQuestionCount = this.props.sessionHistory.questions;
    let currentSessionCorrectCount = this.props.sessionHistory.correctAnswers;

    let lifetimeQuestionCount = this.props.answerHistory.questions;
    let lifetimeCorrectCount = this.props.answerHistory.correctAnswers;

    String.prototype.toProperCase = function () {
          return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    return (


    <div className="container">
   
      <div className="row">
        <div className="col-md-4">
          <h2>...in {bottomLanguage.toProperCase()}?</h2>
          <form onSubmit={this.submitAnswer}>
            <input type="text" placeholder="Enter an answer" ref="userGuess" />
            <button className="btn btn-default"  >Submit</button>
          </form>
        </div>
        <div className="col-md-4">
          <h2></h2>
          <p>{this.props.feedback}</p>
          <p>{this.props.previousAnswer}</p>
       </div>
        <div className="col-md-4">
          <h2>Heading</h2>
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
        </div>
      </div>
      <hr></hr>
      <footer className="footerStyle"> 
        <p>JFK</p>
      </footer>
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
    languageFlipper: state.languageFlipper,
    sessionHistory: state.sessionHistory,
    answerHistory: state.answerHistory
});

export default connect(mapStateToProps)(AnswerInput);




      