import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './Table.css'
import { useState } from 'react'
import {FaTrash} from 'react-icons/fa'
import {AiFillCheckCircle} from 'react-icons/ai'

function Users() {

	const [users,setUsers] = useState([])
	const [message,setMessage] = useState('')

	const getUsers = async () =>{
		const {data} = await axios.get('/users')
		setUsers(data.users)
		
	}
	useEffect(()=>{
		getUsers()
	},[message])

	const deleteUser = async (id) =>{
		const confirm = window.confirm("Are you really want to delete this user?");
		if(confirm){

			const {data} = await axios.get(`/user/${id}`)
			setMessage(data.msg)
			console.log(data.msg)
			getUsers()
		}
	}

	return (
		<main>
			<div className="main__container">
				<div className="main__title">
					<img src="" alt="" />
					<div className="main__greeting">
						<h1>Users</h1>
						
					</div>
				</div>
				
				{message ? <p id="success"><span>{message}</span></p> : ''}

				<table className="styled-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Is Admin</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users ? users.map((user,index)=>(
							<tr key={index}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								{ user.isAdmin === "false" ? (
									<td><AiFillCheckCircle style={{color: 'red',fontSize: '20px'}}/></td>
								):(
									<td><AiFillCheckCircle style={{color: 'green',fontSize: '20px'}}/></td>
								)
								}
								
								<td>...</td>
								<td onClick={() => deleteUser(user._id)}><FaTrash/></td>
							</tr>
						)):''}
						
						
					</tbody>
				</table>
				
			</div>
		</main>
	)
}

export default Users
