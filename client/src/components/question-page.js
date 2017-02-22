import React from 'react';
import * as Cookies from 'js-cookie';
import {SERVER_ROOT} from '../config';

import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Store from '../store';

export default class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
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
            this.props.dispatch(actions.mapUserToStore(userData))
            )
        console.log('LOGGING THE ENTIRE STATE', this.props._id, this.props.googleId, this.props.accessToken, this.props.questionHistory, this.props.email, this.props.name) 
        }

    render() {
        // const questions = this.state.questions.map((question, index) =>
        //     <li key={index}>{question}</li>
        // );

        return (
            <ul className="question-list">
            QUESTIONS DISPLAY HERE
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
    name: state.name 
});

export default connect(mapStateToProps)(QuestionPage);