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

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');

        fetch(`${SERVER_ROOT}/api/questions`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(userData =>
        console.log('USER DATA WE NEED THIS TO DEEP COPY ', userData)
        //    this.props.dispatch(actions.mapUserToStore(userData))
            )
        }




    render() {

       // console.log('LOGGING THE ENTIRE STATE', this.props._id, this.props.googleId, this.props.accessToken, 'QUESTION HISTORY ', this.props.questionHistory, this.props.email, this.props.name, this.props.answerHistory) 
        //why does this work?
        //console.log('THIS IS ANSWER HISTORY ', this.props.answerHistory.questions);
        //but not this?
        //setTimeout(console.log('THIS IS THE QUESTION HISTORY first question STRUNG OUT ', JSON.parse(this.props.questionHistory[0].question)), 3000)

        // if (this.props.questionHistory[0].question) {
        //     const currentQuestion = this.props.questionHistory[0].question;
        //     console.log('LOGGING THE CURRENT QUESTION ', currentQuestion);
        // }



        return (
            <ul className="question-list">

            </ul>
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

export default connect(mapStateToProps)(QuestionPage);