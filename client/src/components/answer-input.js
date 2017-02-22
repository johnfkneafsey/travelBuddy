import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';

export class AnswerInput extends React.Component {
  constructor(props) {
    super(props);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  submitAnswer(e) {
    // e.preventDefault();
    // let userGuess = this.userGuess.value;
    // this.props.dispatch(actions.guessNumber(userGuess));
  }

  render() {
    return (
      <div>
        <h3>What do you think?</h3>
        <form onSubmit={this.submitAnswer}>
          <input type="text" placeholder="Enter an answer" ref={ref => this.userGuess = ref} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps)(AnswerInput);
