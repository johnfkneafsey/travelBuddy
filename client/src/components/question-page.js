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
       // console.log('USER DATA WE NEED THIS TO DEEP COPY ', userData.questionHistory[0].question)
           this.props.dispatch(actions.mapUserToStore(userData))
            )
        }




    render() {

        let question = this.props.questionHistory[0].question;
        let answer = this.props.questionHistory[0].answer;

        return (
            
            <div className="center">
            <h3 className="latin">Latin</h3>
            <div className="question-list card center">
                <div className="question"></div>
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
    answerHistory: state.answerHistory
});

export default connect(mapStateToProps)(QuestionPage);