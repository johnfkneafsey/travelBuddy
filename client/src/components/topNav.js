import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';
import {SERVER_ROOT} from '../config';

export class TopNav extends React.Component {
	constructor(props) {
    	super(props)
	    this.resetData = this.resetData.bind(this);
    }

    resetData() {
        //will reset user data
    }

    render () {

  return (

        <div className="topBar">
            <button className="log-out"><a className="center" href={`${SERVER_ROOT}/auth/logout`}>Log Out</a>
            </button>
            <a className="reset-data" href="#" onClick={this.resetData()}>Reset Data</a>
            <p className="user-name">Welcome User </p>
            <p className="current-score">Your current score is ###</p>
        </div>

  );
}}


const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps)(TopNav);