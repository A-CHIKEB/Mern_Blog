import React from 'react'
import { Link } from 'react-router-dom';
import {BsChevronDoubleLeft, BsChevronDoubleRight} from 'react-icons/bs'
const  Pagination = ({count,page,perPage}) => {

	if (page === undefined) {
		page = 1
	}

	let totalPages = Math.ceil(count/perPage);
	let startLoop = page;
	let diff = totalPages - page;

	if(diff <= 3){
		startLoop = totalPages - 3
	}
	let endLoop = startLoop + 3;
	if(startLoop <= 0){
		startLoop = 1;
	}

	const links = () => {
		const store = [];
		for (let i = startLoop; i <= endLoop; i++) {
			
			store.push(<li key={i} className={i == page ? 'active' : ''}><Link to={`/dashboard/${i}`}>{i}</Link></li>)
		}
		return store;
	}

	const next = () =>{
		if (parseInt(page) == endLoop) {

			return (
				<li>
					<Link to={`/dashboard/${page}`}>
						<BsChevronDoubleRight/>
					</Link>
				</li>
			)

		}else{

			return (
				<li>
					<Link to={`/dashboard/${parseInt(page)+1}`}>
						<BsChevronDoubleRight/>
					</Link>
				</li>
			)
		}
	}
	const prev = () =>{
		if (parseInt(page) == startLoop) {

			return (
				<li>
					<Link to={`/dashboard/${page}`}>
						<BsChevronDoubleLeft/>
					</Link>
				</li>
			)

		}else{

			return (
				<li>
					<Link to={`/dashboard/${parseInt(page)-1}`}>
						<BsChevronDoubleLeft/>
					</Link>
				</li>
			)
		}
	}
	return (
		<div className="pagination">
			{prev()}
			{links()}
			{next()}
		</div>
	)
}

export default Pagination
