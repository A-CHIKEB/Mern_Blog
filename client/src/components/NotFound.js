import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'


const NotFound = () => {
	return (
		<div id="notFound">
			<Helmet>
				<title>404 - Not Found</title>
				<meta name="description" content="Oops! That page could not found"/>
			</Helmet>
			{/* <div className="notFound__container">
				<div className="notFound__container__h1">404</div>
				<div className="notFound__container__p">
					Oops! That page could not found
				</div>
			</div> */}
			<div class="notfound">
				<div class="notfound-404">
					<h1>404</h1>
				</div>
				<h2>Page Not Found</h2>
				<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
				<Link to='/'>Homepage</Link>
				<div class="notfound-social">
					<a href="#"><i class="fa fa-facebook-f"></i></a>
					<a href="#"><i class="fa fa-twitter"></i></a>
					<a href="#"><i class="fa fa-pinterest"></i></a>
					<a href="#"><i class="fa fa-google"></i></a>
				</div>
			</div>
		</div>
	)
}

export default NotFound