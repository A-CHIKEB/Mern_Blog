import {React,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Helmet } from 'react-helmet'
import BgImage from './BgImage'
import {postLogin} from '../../store/asyncMethods/AuthMethod'
import { useTranslation } from 'react-i18next'
function Login() {

	const [state,setState] = useState({
		email:'',
		password:''
	})
	const {loginErrors,loading} = useSelector(state=>state.AuthReducer)
	const dispatch = useDispatch()
	const inputHandler = (e) =>{
		setState({
			...state,
			[e.target.name]:e.target.value,
		})
	}
	const userLogin = (e) =>{
		e.preventDefault()
		dispatch(postLogin(state))
		console.log(state)
	}

	const { t } = useTranslation()
	return (
			<>
				<Helmet>
					<title>User Login</title>
					<meta name="description" content="User login Form"/>
				</Helmet>
				<div className="row mt-80">
					<div className="col-8">
						<BgImage/>
					</div>
					<div className="col-4">
						<div className="account">
							<div className="account__section">
								<form onSubmit={userLogin}>
									<div className="group">
										<h3 className="form-heading">{t("menu_Login")}</h3>
									</div>
									{loginErrors.map(item=>(
											<p id="error"><span>{item.msg}</span></p>
										))
									}
									<div className="group">
										<input 
											type="email" 
											name='email'
											className="group__control" 
											placeholder="Enter Email"
											onChange={inputHandler}
											value={state.email}/>
									</div>
									<div className="group">
										<input 
											type="password" 
											name='password'
											className="group__control" 
											placeholder="Enter Password"
											onChange={inputHandler}
											value={state.password}/>
									</div>

									<div className="group">
										<input 
											type="submit" 
											className="btn btn-default btn-block" 
											value={loading ? '...':t("menu_Login")}/>
									</div>

								</form>
							</div>
						</div>
					</div>
				</div>
			</>
	)
}

export default Login
