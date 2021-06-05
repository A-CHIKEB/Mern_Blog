import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { useSelector,useDispatch } from "react-redux";
import { fetchPosts } from "../store/asyncMethods/PostMethod";
import {Link,useParams} from 'react-router-dom'
import { BsPencil,BsArchive } from "react-icons/bs";
import Loader from './Loader';
import Sidebar from './Sidebar';
import Pagination from './Pagination';

import axios from "axios";
import { CLOSE_LOADER, SET_LOADER } from '../store/types/PostTypes';

// pour afficher ex: 18days ago 
import moment from 'moment'

const Dashboard = () =>{
	const { user:{_id} ,token } = useSelector(state=>state.AuthReducer);

	const {loading} = useSelector(state=>state.PostReducer);

	const {posts,count,perPage} = useSelector(state=>state.FetchPosts);

	const [message,setMessage] = useState('')

	let {page} = useParams();

	if (page === undefined) {
		page = 1
	}
	
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(fetchPosts(_id,page));
	},[page])

	const deletepost = async(id) =>{
		const confirm = window.confirm("Are you really want to delete this post?");
		if(confirm){
			dispatch({type:SET_LOADER})
			try {
				const config = {
					headers : {
						Authorization:`Bearer ${token}`,
					},
				}
				const {data:{msg}} = await axios.get(`/delete/${id}`,config)
				//for load post again
				dispatch(fetchPosts(_id,1));
				setMessage(msg)
			} catch (error) {
				dispatch({type:CLOSE_LOADER})
				console.log(error)
			}
		}else{

		}
	}

	return (
		<>
			<Helmet>
					<title>User Dashboard</title>
					<meta name="description" content="User Dashboard"/>
			</Helmet>
			<div className="container mt-100">
				<div className="row">
					<div className="col-3 p-15">
						<Sidebar/>
					</div>
					<div className="col-9 p-15">
						{message ? <p id="success"><span>{message}</span></p> : ''}
						{
						!loading ? (
							posts.length > 0 ?
								( posts.map(post=>(
									<div className="dashboard__posts" key={post._id}>
										<div className="dashboard__posts__title">
											<Link to='/'>{post.title}</Link>

											<span>Published {moment(post.updateAt).fromNow()}</span>
										</div>
										<div className="dashboard__posts__links">
											<Link to={`/edit/${post._id}`}><BsPencil className="icon"/></Link>
											<BsArchive onClick={()=>deletepost(post._id)} className="icon"/>
										</div>
									</div>
								))
								) : <p id="primary">You dont have any post</p>
							) : (<Loader/>)
						}
						<Pagination page={page} count={count} perPage={perPage}/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard