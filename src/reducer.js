export const storeName = (state = {name:'sridhar vinay'}, action) => {
	switch(action.type) {
		case 'SET_NAME':
			return {
				...state, ...action.data
			}
		default:
			return state;
	}
}

export const storeLoc = (state = 'vellore', action) => {
	switch(action.type) {
		case 'SET_LOC':
			return action.data;
		default:
			return state;
	}
}


export const counter = (state = 0, action) => {
	switch(action.type) {
		case 'ADD_COUNTER':
			return action.data;
		default:
			return state;
	}
}
