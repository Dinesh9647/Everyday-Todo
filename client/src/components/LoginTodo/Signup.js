import { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';

import { signUp } from '../../actions/auth';
import useInput from '../hooks/use-input';
import { authActions } from '../../slices/auth-slice';
import classes from './Auth.module.css';
import Spinner from '../layout/Spinner';
import ErrorModal from '../layout/ErrorModal';

const Signup = () => {
    const dispatch = useDispatch();
    const [hasAttempted, setHasAttempted] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const {
        value: name, 
        isInputValid: isNameValid,
        inputChangeHandler: nameChangeHandler
    } = useInput((name) => name.trim() !== '');
    const {
        value: email, 
        isInputValid: isEmailValid,
        inputChangeHandler: emailChangeHandler
    } = useInput((email) => validator.isEmail(email));
    const {
        value: password1, 
        isInputValid: isPassword1Valid,
        inputChangeHandler: password1ChangeHandler
    } = useInput((password) => validator.isLength(password.trim(), { min: 6 }));
    const {
        value: password2, 
        isInputValid: isPassword2Valid,
        inputChangeHandler: password2ChangeHandler
    } = useInput((password) => validator.isLength(password.trim(), { min: 6 }));

    const signupHandler = (e) => {
        e.preventDefault();
        setHasAttempted(true);
        if(isNameValid && isEmailValid && isPassword1Valid && isPassword2Valid) {
            if(password1 !== password2) {
                dispatch(authActions.setError({ error: {msg: 'Passwords did not match'} }));
            }
            else {
                setHasAttempted(true);
                const password = password1;
                dispatch(signUp(name, email, password));
            }
        }
    }

    if(isLoading) {
        return <Spinner />;
    }

    if(isAuthenticated) {
        return <Redirect to='/todos' />
    }

    return (
        <Fragment>
            {error &&
                <ErrorModal msg={error.msg} />
            }
            <div className={classes.signup}>
                <h1>Sign Up</h1>
                <form className={classes['signup-form']} onSubmit={signupHandler}>
                    <div className={classes.name}>
                        <span className="fas fa-user-alt"></span>
                        <input 
                            className={`${(hasAttempted && !isNameValid) ? classes.invalid : ''}`}
                            type='text' 
                            placeholder='Name' 
                            value={name}
                            onChange={nameChangeHandler}
                        />
                    </div>
                    {hasAttempted && !isNameValid && <p className={classes.warning}>Please enter a name</p>}
                    <div className={classes.email}>
                        <span className="fas fa-envelope"></span>
                        <input 
                            className={`${(hasAttempted && !isEmailValid) ? classes.invalid : ''}`}
                            type='email' 
                            placeholder='Email' 
                            value={email}
                            onChange={emailChangeHandler}
                        />
                    </div>
                    {hasAttempted && !isEmailValid && <p className={classes.warning}>Please enter a valid email</p>}
                    <div className={classes.password}>
                        <span className="fas fa-lock"></span>
                        <input 
                            className={`${(hasAttempted && !isPassword1Valid) ? classes.invalid : ''}`}
                            type='password' 
                            placeholder='Password'
                            value={password1}
                            onChange={password1ChangeHandler}
                        />
                    </div>
                    {hasAttempted && !isPassword1Valid && <p className={classes.warning}>Password must be at least 6 characters</p>}
                    <div className={classes.password}>
                        <span className="fas fa-lock"></span>
                        <input 
                            className={`${(hasAttempted && !isPassword2Valid) ? classes.invalid : ''}`}
                            type='password' 
                            placeholder='Confirm Password' 
                            value={password2}
                            onChange={password2ChangeHandler}
                        />
                    </div>
                    {hasAttempted && !isPassword2Valid && <p className={classes.warning}>Password must be at least 6 characters</p>}
                    <button className={classes.submit} type='submit'>Sign Up</button>
                </form>
                <p className={classes.haveaccount}>
                    Already have an account? <Link className={classes.tologin} to='/login'>Login here</Link>
                </p>
            </div>
        </Fragment>
    );
};

export default Signup;