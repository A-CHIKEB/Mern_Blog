import {React,useEffect,useState} from 'react'
import { Helmet } from 'react-helmet'
import BgImage from './BgImage'
import {useDispatch,useSelector} from 'react-redux'
import {postRegister} from '../../store/asyncMethods/AuthMethod'
import { useTranslation } from 'react-i18next'

function Register(props) {

	const [state,setState] = useState({
		name:'',
		email:'',
		password:''
	})

	const {loading,registerErrors,user} = useSelector(state=>state.AuthReducer);

	// useEffect(()=>{
	// 	if(user){
	// 		props.history.push('/dashboard');
	// 	}
	// },[user])
	const dispatch = useDispatch()


	const handleInputs = (e) =>{
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}

	const { t } = useTranslation()

	const userRegister = async (e) =>{
		e.preventDefault();
		dispatch(postRegister(state))
		
	}
	return (
		<div>
			<>
				<Helmet>
					<title>User Register</title>
					<meta name="description" content="User register Form"/>
				</Helmet>
				<div className="row mt-80">
					<div className="col-8">
						<BgImage/>
					</div>
					<div className="col-4">
						<div className="account">
							<div className="account__section">
								<form onSubmit={userRegister}> 
									<div className="group">
										<h3 className="form-heading">{t("menu_Register")}</h3>
									</div>
									{registerErrors.map(item=>(
											<p id="error"><span>{item.msg}</span></p>
										))
									}
									
									<div className="group">
										<input 
											type="text" 
											name='name'
											className="group__control" 
											placeholder={t("form_name")}
											value={state.name}
											onChange={handleInputs}/>
									</div>

									<div className="group">
										<input 
											type="email" 
											name='email'
											className="group__control" 
											placeholder={t("form_email")}
											value={state.email}
											onChange={handleInputs}/>
									</div>
									<div className="group">
										<input 
											type="password" 
											name='password'
											className="group__control" 
											placeholder={t("form_password")}
											value={state.password}
											onChange={handleInputs}/>
									</div>

									

									<div className="group">
										<input 
											type="submit" 
											className="btn btn-default btn-block" 
											value={loading ? '...':t("menu_Register")}
											
											/>
									</div>

								</form>
							</div>
						</div>
					</div>
				</div>
			</>
		</div>
	)
}

export default Register
