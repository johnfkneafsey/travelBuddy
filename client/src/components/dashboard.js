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
        }).then(userData => {
            this.props.dispatch(actions.mapUserToStore(userData))
            return "next"
        }).then(next => {
            console.log('we have q histortory')
            let questionHistoryObj = this.props.questionHistory;
            
            for (let languages in questionHistoryObj) {
                console.log('WHAT IS THIS ', languages)
                console.log('IN THE LANGUAGES', questionHistoryObj[languages])
                let mValueTally = 0;
                let mValueMax = 0;
                
                for (let i = 0; i < questionHistoryObj[languages].length; i++) {
                    console.log('TALLYING')
                    mValueTally += questionHistoryObj[languages][i].mValue;
                    mValueMax += 5;
                    console.log('mValueMax', mValueMax)
                    console.log('mValueTally', mValueTally)
                }
                console.log('FINAL M VALUES ', mValueTally, ' OUT OF ' , mValueMax)
                    let flipper = this.props.languageFlipper;
            
                    this.props.dispatch(actions.updateProgress(languages, mValueTally, flipper));
                }
        })
    }
        
      
             





     
    
        // if (this.props.questionHistory) {
 
        // console.log('we have q histortory')
        // let questionHistoryObj = this.props.questionHistory;

        //     let returnObj = {
        //         german: null,
        //         swedish: null,
        //         polish: null,
        //         portuguese: null,
        //         italian: null,
        //         french: null,
        //         spanish: null
        //     }
        //     for (let languages in questionHistoryObj) {
        //         console.log('IN THE LANGUAGES', questionHistoryObj[languages])
        //         let mValueTally = 0;
        //         let mValueMax = 0;
        //         for (let i = 0; i < questionHistoryObj[languages].length; i++) {
        //             console.log('TALLYING')
        //             mValueTally += questionHistoryObj[languages][i].mValue;
        //             mValueMax += 5;
        //             console.log('mValueMax', mValueMax)
        //             console.log('mValueTally', mValueTally)
        //         }
        //         console.log('FINAL M VALUES ', mValueTally, ' OUT OF ' , mValueMax)
        //         let percentProgress = (mValueTally - 20) / (mValueMax - 20);
        //         returnObj[languages] = percentProgress
        //         console.log(returnObj)
        //     }
        // }  
        // this.props.dispatch(actions.updateProgress(returnObj));
    



    onSubmit(event) {
  		event.preventDefault();
        let language = (this.refs.language).value.trim();
        this.props.dispatch(actions.selectedLanguage(language));
        this.props.dispatch(actions.toggleDashboard());
	}

    render() {

    let userName = this.props.name;
    
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
        <div>
            <div className="topBar">
                <div className="top-left">
                    <h3>Hey {userName.slice(0, userName.indexOf(" "))}!</h3>
                </div>
                <div className="top-center">
                    <h1 className="lastingLatium">World Traveler</h1>
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

            <div className="w3-container">
                <h2 >Your Progress</h2>
                    <h4><u>Language</u></h4>
                    <h4 className="center"><u className="center">Progress</u></h4>

                        <p ><b>German</b></p>
                        <div className="w3-light-grey w3-round">
                            <div className="w3-container w3-blue w3-round" style={{width: `${percentageValue.german}%`}}>{Math.round(percentageValue.german)}%</div>
                        </div>
                
                        <p ><b>Portuguese</b></p>
                        <div className="w3-light-grey w3-round">
                            <div className="w3-container w3-blue w3-round" style={{width: `${percentageValue.portuguese}%`}}>{Math.round(percentageValue.portuguese)}%</div>
                        </div>
                        <p ><b>Polish</b></p>
                        <div className="w3-light-grey w3-round">
                            <div className="w3-container w3-blue w3-round" style={{width: `${percentageValue.polish}%`}}>{Math.round(percentageValue.polish)}%</div>
                        </div>

                        <p ><b>Spanish</b></p>
                        <div className="w3-light-grey w3-round">
                            <div className="w3-container w3-blue w3-round" style={{width: `${percentageValue.spanish}%`}}>{Math.round(percentageValue.spanish)}%</div>
                        </div>

                        <p ><b>Swedish</b></p>
                        <div className="w3-light-grey w3-round">
                            <div className="w3-container w3-blue w3-round" style={{width: `${percentageValue.swedish}%`}}>{Math.round(percentageValue.swedish)}%</div>
                        </div>

                        <p ><b>Italian</b></p>
                        <div className="w3-light-grey w3-round">
                            <div className="w3-container w3-blue w3-round" style={{width: `${percentageValue.italian}%`}}>{Math.round(percentageValue.italian)}%</div>
                        </div>

                        <p ><b>French</b></p>
                        <div className="w3-light-grey w3-round">
                            <div className="w3-container w3-blue w3-round" style={{width: `${percentageValue.french}%`}}>{Math.round(percentageValue.french)}%</div>
                        </div>
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
        languageFlipper: state.languageFlipper,
        progress: state.progress
    });

    export default connect(mapStateToProps)(Dashboard);
