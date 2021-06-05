import { Link } from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import {LOGOUT} from '../store/types/UserTypes'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'
import { useEffect } from "react"

const languages = [
	{
		code: 'fr',
		name: 'Français',
		country_code: 'fr',
	},
	{
		code: 'en',
		name: 'English',
		country_code: 'gb',
	},
	{
		code: 'ar',
		name: 'العربية',
		dir: 'rtl',
		country_code: 'sa',
	},
]

const Navbar = () =>{
	const { user } = useSelector(state=>state.AuthReducer)
	const dispatch = useDispatch();
	const logout = () =>{
		localStorage.removeItem('myToken')
		dispatch({ type:LOGOUT })
	}

	const currentLanguageCode = cookies.get('i18next') || 'en'
	const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
	const { t } = useTranslation()

	const releaseDate = new Date('2021-03-07')
	const timeDifference = new Date() - releaseDate
	const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

	useEffect(() => {
		console.log('Setting page stuff')
		document.body.dir = currentLanguage.dir || 'ltr'
		document.title = t('app_title')
	}, [currentLanguage, t])


	const Links = user ? 
				(
					<div className="navbar__right">
						{user.isAdmin==="true" ? (
							<li>
								<a href='/admin'>Admin Dashboard</a>
							</li>
						):''}
						
						<li>
							<Link to='/create'>Create Post</Link>
						</li>
						<li>
							<Link to='dashboard'>{user.name}</Link>
						</li>
						<li>
							<span onClick={logout}>Logout</span>
						</li>
					</div>
				):
				(
					<div className="navbar__right">
						<li>
							<div class="dropdown">
								<button class="dropbtn">{t('language')} 
									<i class="fa fa-caret-down"></i>
								</button>
								<div class="dropdown-content">
								{languages.map(({ code, name, country_code }) => (
									<li style={{display:'flex'}} key={country_code}>
										{
											name == "Français" ? (<img src="https://image.flaticon.com/icons/png/512/555/555602.png" style={{width: '25px'}} alt="" />)	 
											: name == "English" ? (<img src="https://image.flaticon.com/icons/png/512/330/330425.png" style={{width: '25px'}}alt="" />)
											: (<img src="https://image.flaticon.com/icons/png/512/206/206686.png" style={{width: '25px'}} alt="" />)
										
										}
										
									<a
										href="#"
										className={classNames('dropdown-item ', {
										disabled: currentLanguageCode === code,
										})}
										onClick={() => {
										i18next.changeLanguage(code)
										}}
									>
										<span
										className={`flag-icon flag-icon-${country_code} mx-2`}
										style={{
											opacity: currentLanguageCode === code ? 0.5 : 1,
										}}
										></span>
										{name}
									</a>
									</li>
								))}
								</div>
							</div> 
						</li>
						<li>
							<Link to ="/login">{t('menu_Login')}</Link>
						</li>
						<li>
							<Link to ="/register">{t('menu_Register')}</Link>
						</li>
					</div>
				)
	return(
		<nav className="navbar">
			<div className="container">
				<div className="navbar__row">
					<div className="navbar__left">
						<Link to ="/">
							<img src="/images/blog.png" alt=""/>
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZJNGTd9miT8BzkIoN8l7jP6Tca-dhGMzcZA&usqp=CAU" id="logoB" alt=""/>
						</Link>
					</div>
					{Links}
				</div>
			</div>
		</nav>
	)
}

export default Navbar