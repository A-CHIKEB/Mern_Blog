import React, { useEffect,useState} from 'react'
import Loader from './Loader'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { htmlToText } from 'html-to-text';
import {Helmet} from 'react-helmet'
import axios from "axios";
import { useTranslation } from 'react-i18next';


function Home() {

	const { loading } = useSelector((state) => state.PostReducer);
	const {user:{token}} = useSelector(state => state.AuthReducer)
	const [posts,setPosts] = useState([])
	const getPosts = async () =>{
		const {data} = await axios.get('/allPosts')
		setPosts(data.posts)
		
	}
	const { t } = useTranslation();
	useEffect(()=>{
		getPosts()
	},[])
	return (
		<>
			<Helmet>
				<title>Web Articles</title>
				<meta name="description" content="Learn HTML, CSS, JAVASCRIPT, VUE, FLUTTER etc"/>
			</Helmet>

			<div className='container'>
				<div className='row mt-100' style={{ marginBottom: '30px' }}>
					<div className='col-9 home' style={{width: '74%',marginRight: '10px'}}>
						
						{!loading ? (
							posts.length > 0 ? (
								posts.map((post) => (
									<div className='row post-style' key={post._id}>
										<div className='col-8'>
											<div className='post'>
												<div className='post__header'>
													<div className='post__header__avator'>
														{post.userName[0]}
													</div>
													<div className='post__header__user'>
														<span>{post.userName}</span>
														<span>
															{moment(post.updatedAt).format('MMM Do YY')}
														</span>
													</div>
												</div>
												<div className='post__body'>
													<h1 className='post__body__title'>
														<Link to={`/details/${post.slug}`}>
															{post.title}
														</Link>
													</h1>
													<div className='post__body__details'>
														{htmlToText(post.body.slice(0, 300))}
													</div>
												</div>
											</div>
										</div>
										<div className='col-4'>
											<div className='post__image'>
												<img src={`/images/blog_images/${post.image}`} alt={post.image} />
											</div>
										</div>
									</div>
								))
							) : (
								'No posts'
							)
						) : (
							<Loader />
						)}
						{!loading ? (
							posts.length > 0 ? (
								posts.map((post) => (
									<div className='row post-style' key={post._id}>
										<div className='col-8'>
											<div className='post'>
												<div className='post__header'>
													<div className='post__header__avator'>
														{post.userName[0]}
													</div>
													<div className='post__header__user'>
														<span>{post.userName}</span>
														<span>
															{moment(post.updatedAt).format('MMM Do YY')}
														</span>
													</div>
												</div>
												<div className='post__body'>
													<h1 className='post__body__title'>
														<Link to={`/details/${post.slug}`}>
															{post.title}
														</Link>
													</h1>
													<div className='post__body__details'>
														{htmlToText(post.body.slice(0, 300))}
													</div>
												</div>
											</div>
										</div>
										<div className='col-4'>
											<div className='post__image'>
												<img src={`/images/blog_images/${post.image}`} alt={post.image} />
											</div>
										</div>
									</div>
								))
							) : (
								'No posts'
							)
						) : (
							<Loader />
						)}
						
					</div>
					
					<div className="col-3 profile">
						<h3>{t('Best_Blogger')}</h3>

						<div className="row" id="bestBlogger">
							<div className="col-3">
								<img src="https://miro.medium.com/fit/c/96/96/1*4kZqDkMButHgdXYx8y6eqg.jpeg" alt="" />
							</div>
							<div className="col-6">
								<p>John Doe</p>
								<span>A Community-backed decentralized exchange for...</span>
							</div>
							<div className="col-3">
								<input type="button" value="View"  />
							</div>
						</div>
					
						<div className="row" id="bestBlogger">
							<div className="col-3">
								<img src="https://miro.medium.com/fit/c/96/96/1*hTzu9Fa69ek1M9MBx_nHmg.jpeg" alt="" />
							</div>
							<div className="col-6">
								<p>Baguette</p>
								<span>A Community-backed decentralized exchange for...</span>
							</div>
							<div className="col-3">
								<input type="button" value="View"  />
							</div>
						</div>
						
						<div className="row" id="bestBlogger">
							<div className="col-3">
								<img src="https://miro.medium.com/fit/c/96/96/1*hTzu9Fa69ek1M9MBx_nHmg.jpeg" alt="" />
							</div>
							<div className="col-6">
								<p>Baguette</p>
								<span>A Community-backed decentralized exchange for...</span>
							</div>
							<div className="col-3">
								<input type="button" value="View"  />
							</div>
						</div>
						
						<div className="row" id="bestBlogger">
							<div className="col-3">
								<img src="https://miro.medium.com/fit/c/96/96/0*TxlM13Dlhrdvbz-b" alt="" />
							</div>
							<div className="col-6">
								<p>Baguette</p>
								<span>A Community-backed decentralized exchange for...</span>
							</div>
							<div className="col-3">
								<input type="button" value="View"  />
							</div>
						</div>
					
					</div>
				</div>
				<div className='row'>
					<div className='col-9'>
						{/* <Pagination
							path='home'
							page={page}
							perPage={perPage}
							count={count}
						/> */}
					</div>
				</div>
			
			</div>

		</>
	)
}

export default Home
