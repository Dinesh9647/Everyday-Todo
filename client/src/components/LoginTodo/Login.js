import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import classes from './Auth.module.css';

import { login } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import ErrorModal from '../layout/ErrorModal';

const Login = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const [inputData, setInputData] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    
    const inputChangeHandler = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(inputData.email, inputData.password));
    };

    if(isLoading) {
        return <Spinner />;
    }

    if(isAuthenticated) {
        return <Redirect to='/todos' />;
    }

    return (
        <Fragment>
            {error && 
                <ErrorModal msg={error.msg} />
            }
            <div className={classes.login}>
                <h1>Login</h1>
                <form className={classes['login-form']} onSubmit={loginHandler}>
                    <div className={classes.email}>
                        <span className="fas fa-envelope"></span>
                        <input 
                            type='email' 
                            name='email'
                            placeholder='Email' 
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className={classes.password}>
                        <span className="fas fa-lock"></span>
                        <input 
                            type='password' 
                            name='password'
                            placeholder='Password' 
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <button className={classes.submit} type='submit'>LOGIN</button>
                </form>
                <p className={classes.noaccount}>
                    Don't have account? <Link className={classes.tosignup} to='/signup'>SignUp Now</Link>
                </p>
            </div>
        </Fragment>
        
    );
};

export default Login;