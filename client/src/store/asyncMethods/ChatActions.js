import {INPUT_FAIL,INPUT_SUCCESS} from "./Type"

export const userMessage = (message,type) => async (dispatch) =>{
	try {
		dispatch({type:INPUT_SUCCESS,payload:{message,type}})
	} catch (error) {
		dispatch({type:INPUT_FAIL})
	}
}