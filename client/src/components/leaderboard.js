import React from 'react';
import * as Cookies from 'js-cookie';
import {SERVER_ROOT} from '../config';

import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Store from '../store';

export class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="leaderboard center">
                <h3>Leaderboard Here</h3>
                
            </div>
        );
    }}

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
        toggleLeaderboard: state.toggleLeaderboard
    });

    export default connect(mapStateToProps)(Leaderboard);
