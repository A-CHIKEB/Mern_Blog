import {CREATE_ERRORS,SET_LOADER,CLOSE_LOADER ,SET_POSTS ,SET_POST,POST_REQUEST,SET_UPDATE_ERRORS} from "../types/PostTypes";

import axios from "axios";
// get token from state AuthReducer
// const token = localStorage.getItem('myToken')

export const createAction = (postData) =>{
	return async (dispatch,getState)=>{
		const { AuthReducer: {token} } = getState()
		dispatch({type:SET_LOADER});



		try {
			const config = {
				headers : {
					Authorization: `Bearer ${token}`
				}
			}

			const { data } = await axios.post('/create_post',postData,config)
			dispatch({type:CLOSE_LOADER});
			console.log(data)

		} catch (error) {
			const {errors} = error.response.data
			console.log(errors)
			dispatch({type:CLOSE_LOADER});
			dispatch({type:CREATE_ERRORS,payload:errors})
		}
	}
}


export const fetchPosts = (id,page) =>{
	return async (dispatch,getState) => {
		const { AuthReducer: {token} } = getState();
		
		dispatch({type:SET_LOADER});
		try{
			const config = {
				headers : {
					Authorization: `Bearer ${token}`
				}
			}

			const { data : {response,count,perPage} } = await axios.get(`/posts/${id}/${page}`,config)

			dispatch({ type:CLOSE_LOADER });

			dispatch({ type:SET_POSTS, payload:{response,count,perPage} })

		}catch(error){
			dispatch({type:CLOSE_LOADER});
		}
	}
}


export const FetchPost = (id) =>{
	return async (dispatch,getState) =>{
		const { AuthReducer: {token} } = getState();
		dispatch({type:SET_LOADER})

		try {
			const config = {
				headers : {
					Authorization: `Bearer ${token}`
				}
			}

			const {data:{post}} = await axios.get(`/posts/${id}`,config);
			// console.log(post)
			dispatch({type:CLOSE_LOADER});
			dispatch({type:SET_POST,payload:post});
			dispatch({type:POST_REQUEST})
		} catch (error) {
			dispatch({type:CLOSE_LOADER});
			console.log(error.message)
		}

	}
}


export const updateAction = (editData) =>{
	return async (dispatch,getState) => {

		const { AuthReducer: {token} } = getState();
		const config = {
			headers : {
				Authorization: `Bearer ${token}`
			}
		}

		dispatch({type:SET_LOADER})

		try {
			
			const {data} = await axios.post('/update',editData,config);
			dispatch({type:CLOSE_LOADER})
			console.log(data);

		}catch(error){
			const {response:{
					data:{errors},
				}
			} = error;

			dispatch({type:CLOSE_LOADER});
			dispatch({type:SET_UPDATE_ERRORS,payload:errors})
			console.log(error.response);
		}
	}
}



export const updateImageAction = (editData) =>{
	console.log("action")
	return async (dispatch,getState) => {

		const { AuthReducer: {token} } = getState();
		const config = {
			headers : {
				Authorization: `Bearer ${token}`
			}
		}

		dispatch({type:SET_LOADER})

		try {
			
			const {data} = await axios.post('/updateImage',editData,config);
			dispatch({type:CLOSE_LOADER})
			console.log(data);

		}catch(error){
			const {response:{
					data:{errors},
				}
			} = error;

			dispatch({type:CLOSE_LOADER});
			dispatch({type:SET_UPDATE_ERRORS,payload:errors})
			console.log(error.response);
		}
	}
}
