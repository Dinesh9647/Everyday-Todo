import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Menu.module.css';

import { authActions } from '../../slices/auth-slice';
import { uiActions } from '../../slices/ui-slice';

const Menu = (props) => {
    const dispatch = useDispatch();
    const showMenu = useSelector((state) => state.ui.showMenu);
    const user = useSelector((state) => state.auth.user);
    const menuHandler = () => {
        if(!showMenu) {
            dispatch(uiActions.toggleMenu());
        }
    };
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }
    return (
        <Fragment>
            <button className={classes['menu-btn']} onClick={menuHandler}>
                <span className='fas fa-bars'></span>
            </button>
            {showMenu && 
                <div className={classes.menu}>
                    <div className={classes['user-info']}>
                        <div className={classes.username}>
                            <span className='fas fa-user'></span>
                            <p>{user.name}</p>
                        </div>
                        <p>{user.email}</p>
                    </div>
                    <div className={classes.nav}>
                        <button className={classes.addtodo} onClick={props.onClickAddTodo}>
                            <span className="fas fa-pen"></span>
                            <span>Add Todo</span>
                        </button>
                        <button className={classes.mytodos} onClick={props.onClickMyTodos}>
                            <span className="fas fa-clipboard-list"></span>
                            <span>My Todos</span>
                        </button>
                    </div>
                    <button className={classes.logout} onClick={logoutHandler}>
                        <span className="fas fa-sign-out-alt"></span>
                        <span>Log Out</span>
                    </button>
                </div>
            }
        </Fragment>
    );
};

export default Menu;