import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './main.scss'

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PrivateRoute from './private/PrivateRoute';
import RouteLinks from './private/RouteLinks';
import NotFound from './components/NotFound';
import Create from './components/Create';
import Edit from './components/Edit';
import UpdateName from './components/UpdateName';
import UpdatePassword from './components/UpdatePassword';
import PostDetails from './components/PostDetails';
import VerifyEmail from './components/VerifyEmail';


function App() {
  return (
    <div id="app">
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' component={Home} exact/>
        <RouteLinks path='/login' component={Login} exact/>
        <RouteLinks path='/register' component={Register} exact/>
        <PrivateRoute path='/dashboard/:page?' component={Dashboard} exact/>
        <PrivateRoute path='/create' component={Create} exact/>
        <PrivateRoute path='/edit/:id' component={Edit} exact/>
        <PrivateRoute path='/updateName' component={UpdateName} exact/>
        <PrivateRoute path='/updatePassword' component={UpdatePassword} exact/>
        <PrivateRoute path='/details/:slug' component={PostDetails} exact/>
        {/* verify email */}
        <PrivateRoute path='/auth/activate/:id' component={VerifyEmail} exact/>
        <Route component={NotFound}/>
      </Switch>
    </Router>

    
    </div>
  );
}

export default App;
