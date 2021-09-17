import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../slices/auth-slice';

import classes from './ErrorModal.module.css';

const BackDrop = (props) => {
    return (
        <div 
            className={classes.backdrop} 
            onClick={props.onConfirm}
        />
    );
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                <p>{props.msg}</p>
            </div>
            <div className={classes.button}>
                <button onClick={props.onConfirm}>Try Again!</button>
            </div>
        </div>
    );
};

const ErrorModal = (props) => {
    const dispatch = useDispatch();
    const closeModalHandler = () => {
        dispatch(authActions.removeError());
    };

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <BackDrop onConfirm={closeModalHandler} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay 
                    msg={props.msg}
                    onConfirm={closeModalHandler}
                />,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    );
};

export default ErrorModal;