import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './Table.css'
import { useState } from 'react'
import {FaTrash} from 'react-icons/fa'
import {AiFillCheckCircle} from 'react-icons/ai'
import moment from 'moment'


import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries,XAxis,YAxis,VerticalGridLines,HorizontalGridLines } from "react-vis";


function Posts() {

	
	const [posts,setPosts] = useState([])
	const [message,setMessage] = useState('')

	const getPosts = async () =>{
		const {data} = await axios.get('/allPosts')
		setPosts(data.posts)
	}


	
	useEffect(()=>{
		getPosts()
	},[message])

	const deleteUser = async (id) =>{
		const confirm = window.confirm("Are you really want to delete this post?");
		if(confirm){

			const {data} = await axios.get(`/delete/${id}`)
			setMessage(data.msg)
			console.log(data.msg)
			getPosts()
		}
		

	}

	return (
		<main>
			<div className="main__container">
				<div className="main__title">
					<img src="" alt="" />
					<div className="main__greeting">
						<h1>Posts</h1>
						
					</div>
				</div>
				
				{message ? <p id="success"><span>{message}</span></p> : ''}

				<table className="styled-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Image</th>
							<th>Slug</th>
							<th>User Name</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{posts ? posts.map((post,index)=>(
							<tr key={index}>
								<td>{post._id}</td>
								<td>{post.title}</td>
								<td><img src={`/images/blog_images/${post.image}`} style={{width:'50px'}} alt="" /></td>
								<td>{post.slug}</td>
								<td>{post.userName}</td>
								<td>...</td>
								<td onClick={() => deleteUser(post._id)}><FaTrash/></td>
							</tr>
						)):''}
						
						
					</tbody>
				</table>
				
			</div>
		</main>
	)
}

export default Posts
