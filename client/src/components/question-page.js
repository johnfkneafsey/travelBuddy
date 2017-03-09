import React from 'react';
import * as Cookies from 'js-cookie';
import {SERVER_ROOT} from '../config';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Store from '../store';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.onFlipLanguage = this.onFlipLanguage.bind(this);
        this.onRandomize = this.onRandomize.bind(this);
    }

    onFlipLanguage() {
        this.props.dispatch(actions.flipLanguage());
    }




    render() {
          let questionDatabase = this.props.questionHistory;
          let language = this.props.selectedLanguage;

          console.log('this is a log of questiondatabase ' ,questionDatabase)
          console.log('this is a log of language ' ,language)
          let topLanguage;
          let currentQuestion;
          if (this.props.languageFlipper % 2 === 0) { 
            currentQuestion = questionDatabase[language][0]['question'];
            topLanguage = "English";
          } else {
            currentQuestion = questionDatabase[language][0]['answer'];
            topLanguage = language.toUpperCase();
          }

          console.log('this is a log of question', currentQuestion)


        return (
            
            <div className="center">
            <h3 className="latin">What is the {topLanguage} phrase:</h3>
            <div className="question-list card center">
                <div className="question">
                   <p>{currentQuestion}</p>

                </div>
                <button className="view-leaderboard btn daisy"   ><a className="center"  onClick={this.onFlipLanguage} >Flip!</a></button>
                </div>
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
    selectedLanguage: state.selectedLanguage,
    languageFlipper: state.languageFlipper
});

export default connect(mapStateToProps)(QuestionPage);