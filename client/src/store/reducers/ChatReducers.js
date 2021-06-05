import {INPUT_FAIL,INPUT_SUCCESS} from "../asyncMethods/Type"

const initialState = {
	messages:[]
}

export const ChatReducer = (state = initialState,action) =>{
	let {messages} = state;

	switch (action.type) {
		case INPUT_SUCCESS:
			messages = [...messages,{message:action.payload.message,type:action.payload.type}];
			return {
				...state,
				messages
			}
		case INPUT_FAIL:
			return {
				...state
			}
		default:
			return state;
	}
}