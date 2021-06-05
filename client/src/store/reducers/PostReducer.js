import {CREATE_ERRORS,SET_LOADER,CLOSE_LOADER,SET_POSTS,SET_POST,POST_REQUEST,POST_RESET, SET_UPDATE_ERRORS, RESET_UPDATE_ERRORS } from "../types/PostTypes";

const initState = {
	loading: false,
	createErrors: [],
	posts:[],
	// pagination
	perPage:0,
	count:0,
	post:{}, //for get post by id
	postStatus:'',
	editErrors:[]
}


export const PostReducer = (state = initState,action) =>{
	if(action.type === SET_LOADER){
		return{
			...state,
			loading:true
		}
	}
	else if(action.type === CLOSE_LOADER){
		return{
			...state,
			loading:false
		}
	}
	else if(action.type === CREATE_ERRORS){
		return{
			...state,
			createErrors: action.payload
		}
	}else{
		
		return state;
	}

}


export const FetchPosts = (state= initState,action)=>{
	if(action.type === SET_POSTS){
		return{
			...state,
			posts:action.payload.response,  //because multi data in payload (postMethod) [response,count,perPage]
			count:action.payload.count,
			perPage:action.payload.perPage
		}
	}else{
		return state
	}
}


export const FetchPost = (state=initState,action)=>{

	if(action.type === SET_POST){
		return {
			...state,
			post:action.payload
		}
	}else if(action.type === POST_REQUEST){
		return {...state,postStatus:true}
	}
	else if(action.type === POST_RESET){
		return {...state,postStatus:false}
	}
	else{
		return state;
	}
}

export const UpdatePost = (state=initState,action)=>{
	if(action.type === SET_UPDATE_ERRORS){
		return{
			...state,
			editErrors:action.payload
		}
	}
	else if(action.type === RESET_UPDATE_ERRORS){
		return{
			...state,
			editErrors:[]
		}
	}
	else{
		return state;
	}
}

export const UpdateImagePost = (state=initState,action)=>{
	if(action.type === SET_UPDATE_ERRORS){
		return{
			...state,
			editErrors:action.payload
		}
	}
	else if(action.type === RESET_UPDATE_ERRORS){
		return{
			...state,
			editErrors:[]
		}
	}
	else{
		return state;
	}
}