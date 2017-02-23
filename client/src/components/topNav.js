import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';
import {SERVER_ROOT} from '../config';

export class TopNav extends React.Component {
	constructor(props) {
    	super(props)
	    this.updateUserInDatabase = this.updateUserInDatabase.bind(this);
    }
    
    updateUserInDatabase() {
        this.props.dispatch(actions.updateUserInDatabase(this.props)) 
    }


    render () {

        console.log('THIS.PROPS' ,this.props)

        let userName = this.props.name;

        let currentSessionQuestionCount = this.props.sessionHistory.questions;
        let currentSessionCorrectCount = this.props.sessionHistory.correctAnswers;

        let lifetimeQuestionCount = this.props.answerHistory.questions;
        let lifetimeCorrectCount = this.props.answerHistory.correctAnswers;

         //href={`${SERVER_ROOT}/auth/logout`}

  return (

        <div className="topBar">
            <button className="log-out" onClick={this.updateUserInDatabase} ><a className="center" >Log Out</a>
            </button>
            <a className="reset-data" href="#" >Reset Data</a>
            <p className="user-name">Welcome {userName}</p>
            <p className="current-score">Your current score is {currentSessionCorrectCount} out of {currentSessionQuestionCount} ({currentSessionCorrectCount / currentSessionQuestionCount}%)</p>
            <p className="current-score">Your lifetime score is {lifetimeCorrectCount} out of {lifetimeQuestionCount} ({lifetimeCorrectCount / lifetimeQuestionCount}%)</p>
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
    sessionHistory: state.sessionHistory

});

export default connect(mapStateToProps)(TopNav);