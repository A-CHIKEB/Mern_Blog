import { useState } from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import AdminHome from './components/admin/AdminHome'
import Comments from './components/admin/Comments';
import NavBar from './components/admin/Navbar/NavBar';
import Posts from './components/admin/Posts';
import SideBar from './components/admin/SideBar/SideBar';
import Users from './components/admin/Users';
import './scss/admin/_AdminHome.scss'

const  AdminApp = ({ history }) =>{

	const {user} = useSelector(state => state.AuthReducer)

	const [sideBarOpen,setSideBarOpen] = useState(false);

	const openSideBar = () =>{
		setSideBarOpen(true)
	}
	const closeSideBar = () =>{
		setSideBarOpen(false)
	}
	if (user.isAdmin === "true") {

		return (
			<div className="container" id="adminHome">
				<NavBar sideBarOpen={sideBarOpen} openSideBar={openSideBar}/>
				<Router>
					<Switch>
						<Route path='/admin' component={AdminHome} exact/>
						<Route path='/admin/users' component={Users} exact/>
						<Route path='/admin/posts' component={Posts} exact/>
						<Route path='/admin/comments' component={Comments} exact/>
					</Switch>
				</Router>
				<SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar}/>
			</div>

		)
				
	}else{
		window.location.replace('http://localhost:3000/')
		// browserHistory.push('/user')
		
	}
}

export default AdminApp
