import React, { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import {useState} from "react"
import { Helmet } from 'react-helmet';
import Sidebar from "./Sidebar";
import { updateNameAction } from '../store/asyncMethods/ProfileMethod';
import { RESET_PROFILE_ERRORS } from '../store/types/ProfileTypes';
import { LOGOUT } from '../store/types/UserTypes';


function UpdateName() {
	
	const [userName,setUserName] = useState('')
	const {user:{ name,_id }} = useSelector((user)=>user.AuthReducer)
	
	const { loading } = useSelector(state=>state.PostReducer);

	const {updateErrors} = useSelector(state=>state.updateName)

	const dispatch = useDispatch();
	const updateNameMethod = (e) =>{
		e.preventDefault();
		dispatch(updateNameAction({name:userName, id:_id}))
		dispatch({type:LOGOUT})
	}
	useEffect(()=>{
		setUserName(name)
	},[])

	useEffect(()=>{
		if(updateErrors.length !== 0){
			dispatch({type:RESET_PROFILE_ERRORS})
		}
	},[])

	

	return (
		<div className="container mt-100">
			<Helmet>
					<title>Update Name</title>
					<meta name="description" content="Update the user name"/>
			</Helmet>
			<div className="row">
				<div className="col-3 p-15">
					<Sidebar/>
				</div>
				<div className="col-9 p-15">
					<div className="card">
						<div className="card__h3">Update Name</div>
						{updateErrors.map((error,index)=>(
							<p id="error" key={index}>{error.msg}</p>
						))}
						<form onSubmit={updateNameMethod}>
							<div className="group">
								<input type="text" 
									   name=""
									   id=""
									   className="group__control"
									   placeholder="Name...."
									   onChange={(e)=>setUserName(e.target.value)}
									   value={userName} />
							</div>

							<div className="group">
								<input type="submit" 
									   value="Update Name" 
									   className="btn btn-default btn-block"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UpdateName
