import React, { useEffect,useState} from 'react'
import { useSelector } from "react-redux";
import axios from "axios";

import Chart from '../Charts/Chart'
import './Main.css'

import moment from 'moment'
import '../../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries,XAxis,YAxis,VerticalGridLines,HorizontalGridLines } from "react-vis";

function Main() {


	
	const {user} = useSelector(state => state.AuthReducer)
	const [posts,setPosts] = useState([])
	const [users,setUsers] = useState([])
	const [comments,setComments] = useState([])

	const getPosts = async () =>{
		const {data} = await axios.get('/allPosts')
		setPosts(data.posts)
	}
	const getUsers = async () =>{
		const {data} = await axios.get('/users')
		setUsers(data.users)
	}
	const getComments = async () =>{
		const {data} = await axios.get('/comments')
		setComments(data.comments)
	}
	
	// Chart Posts
	var arr = []
	const data = [{x: 0, y: 2},
		{x: 1, y: 3},
		{x: 2, y: 3}]

	const chartData = async () =>{
		posts.map((post)=>{
				
			arr.push(parseInt( moment(post.createdAt).fromNow()))
		})
		arr.sort();
		console.log(arr)

		let i = 0
		arr.map((post)=>{

			data.push({x:i,y:post})
			i++;
		})
		console.log(data)

	}

	useEffect(()=>{
		getPosts()
		getUsers()
		getComments()
		chartData()
	},[])
	return (
		<main>
			<div className="main__container">
				<div className="main__title">
					<img src="" alt="" />
					<div className="main__greeting">
						<h1>Hello Aymen Chikeb</h1>
						<p>Welcome to your admin dashboard</p>
					</div>
				</div>

				<div className="main__cards">
					<div className="card">
					<i className="fa fa-user fa-2x" style={{color:'#000'}}></i>
						<div className="card__inner">
							<p className="text-primary-p">Number of Users</p>
							<span className="font-bold text-title">{users.length}</span>
						</div>
					</div>

					<div className="card">
						<i className="fa fa-medium fa-2x text-red"></i>
						<div className="card__inner">
							<p className="text-primary-p">Number of Posts</p>
							<span className="font-bold text-title">{posts.length}</span>
						</div>
					</div>

					<div className="card">
						<i className="fa fa-eye fa-2x text-yellow"></i>
						<div className="card__inner">
							<p className="text-primary-p">Times of Reading</p>
							<span className="font-bold text-title">340 s</span>
						</div>
					</div>

					<div className="card">
						<i className="fa fa-comments fa-2x text-green"></i>
						<div className="card__inner">
							<p className="text-primary-p">Number of Comments</p>
							<span className="font-bold text-title">{comments.length}</span>
						</div>
					</div>

				</div>
				<div className="charts">
					<div className="charts__left">
						<div className="charts__left__title">
							<div>
								<h1>Post statistics</h1>
							</div>
							<i className="fa fa-calendar"></i>
						</div>
						{data ? (
							<div style={{marginTop:'15px'}}>
								<XYPlot height={300} width={300}>
									<VerticalGridLines/>
									<HorizontalGridLines/>
									<XAxis/>
									<YAxis/>
									<LineSeries data={data} color="red"/>
									<LineSeries data={data} color="purple"/>
									<LineSeries data={data} color="yellow"/>
								</XYPlot>
							</div>
						):''}
						
					</div>

					<div className="charts__right">
						<div className="charts__right__title">
							<div>
								<h1>Stats Reports</h1>
							</div>
							<i className="fa fa-cube"></i>
						</div>
						<div className="chart__right__cards">
							<div className="card1">
								<h1>Posts</h1>
								<p>{posts.length}</p>
							</div>
							<div className="card2">
								<h1>Comments</h1>
								<p>{comments.length}</p>
							</div>
							<div className="card3">
								<h1>Users</h1>
								<p>{users.length}</p>
							</div>
							<div className="card4">
								<h1>Read</h1>
								<p>360s</p>
							</div>
						</div>
					</div>

				</div>

				
			</div>
		</main>
	)
}

export default Main
