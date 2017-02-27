import React from 'react';
import * as Cookies from 'js-cookie';

import QuestionPage from './question-page';
import LoginPage from './login-page';
import TopNav from './topNav';
import AnswerInput from './answer-input';
import Leaderboard from './leaderboard';
import {SERVER_ROOT} from '../config';

// travel words for different languages
// additional resources
// progress dashboard
// pronunciation
// choose language dashboard

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch(`${SERVER_ROOT}/api/me`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status !== 401) {
                        // Unauthorized, clear the cookie and go to
                        // the login page
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(currentUser =>
                this.setState({
                    currentUser
                })
            );
        }
    }

    render() {
        if (!this.state.currentUser) {
            return <LoginPage />;
        }

        console.log('leaderboard below')
        setTimeout(console.log(this.props.toggleLeaderboard), 3000);

        if (this.props.toggleLeaderboard % 2 === 0) {
            console.log('true');
            return (
                <div>
                    <TopNav />
                    <Leaderboard />
                </div>
            )
        }

        return (
            <div>
                <TopNav />
                <div className="parent">
                <QuestionPage />
                <AnswerInput />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    toggleLeaderboard: state.toggleLeaderboard
});


export default App;
