import React from 'react';
import * as Cookies from 'js-cookie';
import {SERVER_ROOT} from '../config';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Store from '../store';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {

        //  let questionDatabase = this.props.questionHistory;
        //  let language = this.props.selectedLanguage;

        //  let question = questionDatabase.language   //[0].question;
        // //  let answer = questionDatabase.language[0].answer;

        return (
            
            <div className="center">
            <h3 className="latin">Latin</h3>
            <div className="question-list card center">
                <div className="question">
                   

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
    selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(QuestionPage);