import { CLOSE_LOADER, SET_LOADER } from "../types/PostTypes";
import { SET_PROFILE_ERRORS, RESET_PROFILE_ERRORS } from "../types/ProfileTypes";

const initState = {
	loading:false,
	updateErrors:[]
}

export const updateName = (state=initState,action) =>{
	if(action.type===SET_PROFILE_ERRORS){
		return{
			...state,
			updateErrors:action.payload
		}
	}else if(action.type===RESET_PROFILE_ERRORS){
		return {
			...state,
			updateErrors:[]
		}
	}else{
		return state;
	}
}