import update from 'immutability-helper';
import * as actions from '../actions/index';
import store from '../store';



const initialState = {
    _id: '',
    googleId: '',
    accessToken: '',
    questionHistory: '',
    email: '',
    name: ''    
}

export const mainReducer = (state= initialState, action) => {
    if (action.type === actions.MAP_USER_TO_STORE) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE MAP_USER_TO_STORE GETSTATE()")}, 3000);
        return update(state, {
            _id: {$set: action.userData._id},
            googleId: {$set: action.userData.googleId},
            accessToken: {$set: action.userData.accessToken},
            questionHistory: {$set: action.userData.questionHistory},
            email: {$set: action.userData.email},
            name: {$set: action.userData.name}
        })
    }

	return state;
}