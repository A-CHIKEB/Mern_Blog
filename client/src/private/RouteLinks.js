import { Route ,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'

// Si vous etes connecté on vous interdire les paths suivant (login/register)
const RouteLinks = (props) =>{
	const { user } = useSelector(state=>state.AuthReducer);
	return user ? 
		(
			<Redirect to='/dashboard' /> 
		):(
			<Route path={props.path} component={props.component} /> 
		)

}

export default RouteLinks