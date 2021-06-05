import { CLOSE_LOADER, SET_LOADER } from "../types/PostTypes";
import { SET_PROFILE_ERRORS, RESET_PROFILE_ERRORS } from "../types/ProfileTypes";
import axios from 'axios'


export const updateNameAction = (user) =>{
	return async (dispatch,getState)=>{

		const {AuthReducer : {token}} = getState()

		const config = {
			headers:{
				'Content-Type':'application/json',	
				Autorization: `Bearer ${token}`,
			}
		};

		try {
			dispatch({type:SET_LOADER})
			const {data} = await axios.post('/updateName',user,config)
			dispatch({type:CLOSE_LOADER});
			console.log(data)

		} catch (error) {
			dispatch({type:CLOSE_LOADER});
			//console.log(error.response.data);
			dispatch({type:SET_PROFILE_ERRORS,payload:error.response.data.errors})
		}
	}
}