import React from 'react'
import { BrowserRouter, Link } from "react-router-dom";
import './SideBar.css'



function SideBar({openSideBar,closeSideBar}) {
	return (
		<div className={openSideBar ? 'sidebar_responsive':''} id="sidebar">
			<div className="sidebar__title">
				<div className="sidebar__img">
					<img src="" alt="logo" />
					<h1>Blog Dashboard</h1>
				</div>
				<i className="fa fa-times" id="sidebarIcon" onClick={()=>closeSideBar()}></i>
			</div>
			<div className="sidebar__menu">
				<div className="sidebar__link active_menu_link">
					<i className="fa fa-home"></i>
					<a href="#">Dashboard</a>
				</div>
				<h2>MNG</h2>
				<div className="sidebar__link">
					<i className="fa fa-user-secret"></i>
					<a href="/admin">Admin Management</a>
				</div>

				<div className="sidebar__link">
					<i className="fa fa-users"></i>
					<a href="/admin/users">Users Management</a>
				</div>

				<div className="sidebar__link">
					<i className="fa fa-cube"></i>
					<a href="/admin/posts">Posts Management</a>
				</div>

				<div className="sidebar__link">
					<i className="fa fa-comments"></i>
					<a href="/admin/comments">Comments Management</a>
				</div>

				<div className="sidebar__link">
					<i className="fa fa-info"></i>
					<a href="#">Contacts</a>
				</div>

				<h2>LEAVE</h2>
				<div className="sidebar__link">
					<i className="fa fa-question"></i>
					<a href="#">Requests</a>
				</div>

				<div className="sidebar__link">
					<i className="fa fa-sign-out"></i>
					<a href="#">Leave Policy</a>
				</div>

				<div className="sidebar__link">
					<i className="fa fa-calendar-check-o"></i>
					<a href="#">Special Days</a>
				</div>

				<div className="sidebar__link">
					<i className="fa fa-files-o"></i>
					<a href="#">Apply For Leave</a>
				</div>


			</div>
			
		</div>
	)
}

export default SideBar
