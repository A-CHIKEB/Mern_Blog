import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill';
import { useParams } from 'react-router'
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { FetchPost,updateAction,UpdatePost,updateImageAction } from '../store/asyncMethods/PostMethod';
import { POST_RESET, RESET_UPDATE_ERRORS } from '../store/types/PostTypes';
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")

function Edit() {
	const {id} = useParams();

	const [value,setValue] = useState('');
	const [state,setState] = useState({
		title:'',
		description:'',
		image:''
	})
	const [currentImage,setCurrentImage] = useState('Choose image')
	const [imagePreview,setImagePreview] = useState('');

	const [imagefiles,setImagefiles] = useState([])


	const dispatch = useDispatch();
	const {loading} = useSelector((state)=>state.PostReducer)
	const {post,postStatus} = useSelector((state)=>state.FetchPost)

	const {editErrors} = useSelector(state=>state.UpdatePost)
	const fileHandle = (e) =>{
		if(e.target.files.length !== 0){

			setCurrentImage(e.target.files[0].name)
			console.log(e.target.files[0])
			setState({
				...state,
				[e.target.name]:e.target.files[0],
			})
			setImagefiles(e.target.files[0])
	
			const reader = new FileReader();
			reader.onloadend = () =>{
				setImagePreview(reader.result)
			}
			reader.readAsDataURL(e.target.files[0])

		}
		
	}
	
	useEffect(()=>{
		console.log(post)
		if(postStatus){
			setState({
				title:post.title,
				description:post.description,
				image:post.image
			})
			setValue(post.body)
			dispatch({type:POST_RESET})
		}else{
			dispatch(FetchPost(id))
		}
	},[post])

	const updatePost = (e) =>{
		e.preventDefault();
		// dispatch(updateAction({
		// 	title:state.title,
		// 	body:value,
		// 	description:state.description,
		// 	id:post._id
		// }));
		const formData = new FormData();

		formData.append('image',state.image)
		formData.append('id',post._id)
		dispatch(updateImageAction(formData))

	}

	useEffect(() => {
		dispatch({type:RESET_UPDATE_ERRORS})
	}, [])


	return (
		
		<div className="mt-100">
			<Helmet>
					<title>Edit Post</title>
					<meta name="description" content="udpate post"/>
			</Helmet>
			<div className="container">
					<div className="row">
						<div className="col-6">
							<div className="card">
								<h3 className="card__h3">Edit Post {id}</h3>
								{editErrors ? editErrors.map((err)=>(
									<p id="error"><span>{err.msg}</span></p>
								)):''
								}
								<form onSubmit={updatePost}>
									<div className="group">
										<label htmlFor="title">Post Title</label>
										<input  type="text" name="title" id="title" 
												className="group__control" 
												placeholder="Post title..."
												value={state.title}
												onChange={(e)=>setState({...state,title:e.target.value})}/>
									</div>

									<div className="group">
										<label htmlFor="">Post Body</label>
										<ReactQuill theme="snow" value={value} onChange={setValue}/>
									</div>

									<div className="group">
										<label htmlFor="description">Description</label>
										<textarea id="description" 
												name="description"
												cols="30" rows="10" 
												className="group__control" 
												placeholder="meta description..."
												maxLength="150"
												defaultValue={state.description}
												onChange={(e)=>setState({...state,description:e.target.value})}>
										</textarea>
										<p className="lenght">{state.description ? state.description.length : 0}</p>
									</div>

									<div className="group">
											<input type="submit" 
												value="Edit" 
												className="btn btn-default btn-block"/>
									</div>
								</form>

							</div>
						</div>
						
						<div className="col-6 p-15">
								<div className="card">
									{/* <div className="group">
										<label htmlFor="">Post URL</label>
										<input 
											type="text" 
											name="slug"
											id="slug"
											className="group__control"
											placeholder="POST URL..."
											value={slug}
											onChange={slugHandle}/>
									</div>
									<div className="group">
										{slugButton ? 
										(
											<button className="btn btn-default"
													onClick={handleURL}>Update Slug</button>
										)
										:('')
										}
									</div> */}
									<div className="group">
										
											{
												state.image ? (
													<div className="imagePreview">
														<label>Current Image</label>
														<img src={`/images/blog_images/${state.image}`} alt=""/>
													</div>
												):''
											}
										
											{
												imagePreview ? (
													<div className="imagePreview">
														<label>New Image</label>
														<img src={`${imagePreview}`} alt=""/>
													</div>
												):''
											}
									</div>
									<div className="group">
											<label htmlFor="image" className="image__label">{currentImage}</label>
											<input type="file" name="image" id="image" onChange={fileHandle}/>
									</div>
									
								</div>
							</div>
						
					</div>
			</div>
		
		</div>
	)
}

export default Edit
