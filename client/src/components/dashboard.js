import React from 'react';
import * as Cookies from 'js-cookie';
import {SERVER_ROOT} from '../config';

import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Store from '../store';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    	this.onSubmit = this.onSubmit.bind(this);

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
    }

    onSubmit(event) {
  		event.preventDefault();
        let language = (this.refs.language).value.trim();
        this.props.dispatch(actions.selectedLanguage(language));
        this.props.dispatch(actions.toggleDashboard());
	}

    render() {

    let userName = this.props.name;

    return (
        <div>
            <div className="topBar">
                <div className="top-left">
                    <h3>Hey {userName.slice(0, userName.indexOf(" "))}!</h3>
                </div>
                <div className="top-center">
                    <h1 className="lastingLatium">Travel Buddy</h1>
                </div>
                <div className="top-right">
                    <button className="log-out btn daisy" ><a className="center"  onClick={this.updateUserInDatabase} href={`${SERVER_ROOT}/auth/logout`}>Log Out</a></button>
                </div>          
            </div>           
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Select a Language</label>
						<select name="language" id='language' className="form-control pickLanguage" value={this.value} ref="language" required>
	      					<option key={1} value="german" className="center-input-text">German</option>
                            <option key={2} value="swedish" className="center-input-text">Swedish</option>
	      					<option key={3} value="polish" className="center-input-text">Polish</option>
                            <option key={4} value="portuguese" className="center-input-text">Portuguese</option>
	      					<option key={5} value="italian" className="center-input-text">Italian</option>
                            <option key={6} value="french" className="center-input-text">French</option>
	      					<option key={7} value="spanish" className="center-input-text">Spanish</option>                                                
                        </select>
                        <input type="submit" className="btn btn-primary pickLanguageBtn"/>
                </form>
            </div>





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
        toggleLeaderboard: state.toggleLeaderboard,
        selectedLanguage: state.selectedLanguage,
        languageFlipper: state.languageFlipper
    });

    export default connect(mapStateToProps)(Dashboard);
