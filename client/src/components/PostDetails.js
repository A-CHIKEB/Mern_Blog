import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import moment from 'moment';
import { htmlToText } from 'html-to-text';
import Helmet from 'react-helmet';
import axios from 'axios'
import Loader from './Loader';
import parse from 'html-react-parser'
import Comments from './Comments';

function PostDetails({match}) {
	const slug = match.params.slug

	const { loading} = useSelector((state) => state.PostReducer);
	const {user} = useSelector(state => state.AuthReducer)
	const [postDetails,setPostDetails] = useState([])

	const [comments,setComments] = useState('')


	const getPostDetails = async (postSlug) =>{
		const {data} = await axios.get(`/details/${postSlug}`)
		setPostDetails(data.post)
		setComments(data.comments)
		console.log(data)
	}
	useEffect(()=>{
		getPostDetails(slug)
	},[slug])

	// comment
	const [comment,setComment] = useState('')
	const addComment = async(e) =>{
		e.preventDefault()
		try {

			const config = {
				headers : {
					Authorization:`Bearer ${user.token}`,
				},
			}
			const commentData = {
				comment:comment,
				id:postDetails._id,
				userName:user.name
			}
			console.log(commentData)

			const {data} = await axios.post(`/comment`,{
				comment:comment,
				id:postDetails._id,
				userName:user.name},
			config)
			setComment('')
			getPostDetails(slug)
			

		}catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='container'>
			<div className='row mt-100'>
				<div className='col-12'>
					{!loading ? (
						<div className='post__details'>
							<Helmet>
								<title>{postDetails.title}</title>
							</Helmet>
							<div className='post__header'>
								<div className='post__header__avator'>
									{postDetails.userName ? postDetails.userName[0] : ''}
								</div>
								<div className='post__header__user'>
									<span>{postDetails.userName}</span>
									<span>{moment(postDetails.updatedAt).format('MMM Do YY')}</span>
								</div>
							</div>
							<div className='post__body'>
								<h1 className='post__body__title'>{postDetails.title}</h1>
								<div className='post__body__details'>
									{parse(`${postDetails.body}`)}
								</div>
								<div className='post__body__image'>
									<img src={`/images/blog_images/${postDetails.image}`} alt={postDetails.image} />
								</div>
							</div>
							{user?(
								<>
								<div className="post__comment">
									<form onSubmit={addComment}>
										<div className="group">
											<input type="text" 
												className="group__control" 
												placeholder="Write a comment..."
												onChange={(e)=>setComment(e.target.value)}
												value={comment} />
										</div>
										<div className="group">
											<input type="submit" value="Post comment"  className="btn btn-default" style={{float: 'right'}} />
										</div>
									</form>
								</div>
								<Comments comments={comments} />
								</>
							):''}
						</div>
					) : (
						<Loader />
					)}
				</div>
			</div>
		</div>
	)
}

export default PostDetails
