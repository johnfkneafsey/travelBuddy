import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';

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
            <a className="reset-data" href="#" onClick={this.resetData()}>Reset Data</a>
            <p className="current-score">Your current score is ###</p>
        </div>

  );
}}


const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps)(TopNav);