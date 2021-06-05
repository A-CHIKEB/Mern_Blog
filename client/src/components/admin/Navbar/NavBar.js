import React from 'react'
import './NavBar.css'
function NavBar({openSideBar,closeSideBar}) {
	return (
		<div className="navbar">
			<div className="nav_icon" onClick={()=>openSideBar()}>
				<i className="fa fa-bars"></i>
			</div>
			<div className="navbar__left">
				<a href="#">Subscibes</a>
				<a href="#">Video Management</a>
				<a className="active_link" href="#">
					Admin
				</a>
			</div>
			<div className="navbar__right">
				<a href="#">
					<i className="fa fa-search"></i>
				</a>

				<a href="/">
					<i className="fa fa-internet-explorer"></i>
				</a>
				<a href="#">
					<img src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" style={{position: 'relative',top: '3px'}} width="30" alt="avatar" />
				</a>
			</div>
		</div>
	)
}

export default NavBar
