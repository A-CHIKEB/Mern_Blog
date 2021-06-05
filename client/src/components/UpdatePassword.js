import React, { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import {useState} from "react"
import { Helmet } from 'react-helmet';
import Sidebar from "./Sidebar";
import { UpdatePasswordAction } from '../store/asyncMethods/ProfileMethod';
import { RESET_PROFILE_ERRORS } from '../store/types/ProfileTypes';
import { LOGOUT } from '../store/types/UserTypes';
import axios from "axios";

function UpdatePassword() {
	
	const [newPassword,setNewPassword] = useState('')
	const [currentPassword,setCurrentPassword] = useState('')
	const [message,setMessage] = useState('')

	const {user:{ password,_id,token }} = useSelector((user)=>user.AuthReducer)
	
	const { loading } = useSelector(state=>state.PostReducer);

	// const {updateErrors} = useSelector(state=>state.UpdatePassword)

	const dispatch = useDispatch();
	const UpdatePasswordMethod = async (e) =>{
		e.preventDefault();

		const config = {
			headers:{
				'Content-Type':'application/json',	
				Autorization: `Bearer ${token}`,
			}
		};

		const user = {
			"id":_id,
			"currentPassword":currentPassword,
			"newPassword":newPassword
		}
		const {data} = await axios.post('/updatePassword',user,config)
		// console.log(data)
		setMessage(data)
		//dispatch({type:LOGOUT})
	}

	useEffect(()=>{
		//setNewPassword(password)
	},[])

	
	

	return (
		<div className="container mt-100">
			<Helmet>
					<title>Update Password</title>
					<meta name="description" content="Update the user password"/>
			</Helmet>
			<div className="row">
				<div className="col-3 p-15">
					<Sidebar/>
				</div>
				<div className="col-9 p-15">
					<div className="card">
						<div className="card__h3">Update Password</div>

						{message ? (

							<p id={message.type}>{message.msg}</p>

						):''}

						<form onSubmit={UpdatePasswordMethod}>
							<div className="group">
								<input type="text" 
									   name=""
									   id=""
									   className="group__control"
									   placeholder="Current Password...."
									   onChange={(e)=>setCurrentPassword(e.target.value)}
									   value={currentPassword} />
							</div>

							<div className="group">
								<input type="text" 
									   name=""
									   id=""
									   className="group__control"
									   placeholder="Password...."
									   onChange={(e)=>setNewPassword(e.target.value)}
									   value={newPassword} />
							</div>

							<div className="group">
								<input type="submit" 
									   value="Update Password" 
									   className="btn btn-default btn-block"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UpdatePassword
