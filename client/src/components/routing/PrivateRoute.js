import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.loading);

    return (
        <Route 
            {...rest}
            render={(props) => 
                isLoading ? (
                    <Spinner />
                ) :
                isAuthenticated ? (
                    <Component {...props} /> 
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

export default PrivateRoute;