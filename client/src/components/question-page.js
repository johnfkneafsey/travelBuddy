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

    }

    onFlipLanguage() {
        this.props.dispatch(actions.flipLanguage());
    }


    render() {
          let questionDatabase = this.props.questionHistory;
          let language = this.props.selectedLanguage;
          let topLanguage;
          let currentQuestion;
          if (this.props.languageFlipper % 2 === 0) { 
            currentQuestion = questionDatabase[language][0]['question'];
            topLanguage = "English";

          } else {
            currentQuestion = questionDatabase[language][0]['answer'];

            topLanguage = language.toUpperCase();
          }

          String.prototype.toProperCase = function () {
                return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          };


        let sectionTotal = 80;

        let percentageValue = {
            german: this.props.progress.german / sectionTotal * 100,
            portuguese: this.props.progress.portuguese / sectionTotal * 100,
            polish: this.props.progress.polish / sectionTotal * 100,
            spanish: this.props.progress.spanish / sectionTotal * 100,
            swedish: this.props.progress.swedish / sectionTotal * 100,
            italian: this.props.progress.italian / sectionTotal * 100,
            french: this.props.progress.french / sectionTotal * 100        
        }

        return (

        <div className="jumbotron">
            <div className="container">
                <h1>What is the {topLanguage.toProperCase()} phrase:</h1>
                <p>"{currentQuestion}"</p>
                <div className="container">
                    <div className="row">
                        <div className="col">   
                            <p><a className="btn btn-primary btn-lg" href="#" role="button" onClick={this.onFlipLanguage}>Flip ↕</a></p>
                        </div>
                        <div className="col">     

                        </div>
                    </div>   
                </div>
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
    languageFlipper: state.languageFlipper,
    progress: state.progress
});

export default connect(mapStateToProps)(QuestionPage);