import store from '../store'



export const MAP_USER_TO_STORE = 'MAP_USER_TO_STORE';
export const mapUserToStore = (userData) => ({
	type: MAP_USER_TO_STORE,
	userData: userData
})


