import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './Table.css'
import { useState } from 'react'
import {FaTrash} from 'react-icons/fa'
import {AiFillCheckCircle} from 'react-icons/ai'

function Comments() {

	
	const [comments,setComments] = useState([])
	
	const [message,setMessage] = useState('')

	const getComments = async () =>{
		const {data} = await axios.get('/comments')
		setComments(data.comments)
	}	
	useEffect(()=>{
		getComments()
	},[message])

	const deleteUser = async (id) =>{
		const confirm = window.confirm("Are you really want to delete this user?");
		if(confirm){

			const {data} = await axios.get(`/comment/delete/${id}`)
			setMessage(data.msg)
			console.log(data.msg)
			getComments()
		}
	}

	return (
		<main>
			<div className="main__container">
				<div className="main__title">
					<img src="" alt="" />
					<div className="main__greeting">
						<h1>Comments</h1>
						
					</div>
				</div>
				
				{message ? <p id="success"><span>{message}</span></p> : ''}

				<table className="styled-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>PostId</th>
							<th>Comment</th>
							<th>User Name</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{comments ? comments.map((comment,index)=>(
							<tr key={index}>
								<td>{comment._id}</td>
								<td>{comment.postId}</td>
								<td>{comment.comment}</td>
								<td>{comment.userName}</td>
								<td>...</td>
								<td onClick={() => deleteUser(comment._id)}><FaTrash/></td>
							</tr>
						)):''}
						
						
					</tbody>
				</table>
				
			</div>
		</main>
	)
}

export default Comments
