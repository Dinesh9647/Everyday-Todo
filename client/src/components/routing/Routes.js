import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../LoginTodo/Login';
import Signup from '../LoginTodo/Signup';
import Todo from '../LoginTodo/Todo';
import NotFound from '../layout/NotFound';

const Routes = () => {
    
    return (
        <Switch>
            <Route exact path='/' >
                <Redirect to='/login' />
            </Route>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute exact path='/todos' component={Todo} />
            <Route component={NotFound} />
        </Switch>        
    );
};

export default Routes;