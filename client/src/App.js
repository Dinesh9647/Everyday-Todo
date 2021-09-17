import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import Routes from './components/routing/Routes';
import { loadUser } from './actions/auth';
import { authActions } from './slices/auth-slice';
import { uiActions } from './slices/ui-slice';

function App() {
    const dispatch = useDispatch();
    const showMenu = useSelector((state) => state.ui.showMenu);
    const showDateList = useSelector((state) => state.ui.showDateList);
    useEffect(() => {
        if(localStorage.token) {
            dispatch(loadUser());
        }
        // Log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
            if(!localStorage.token) {
                dispatch(authActions.logout());
            }
        })
    }, [dispatch]);
    const closeMenusHandler = () => {
        if(showMenu) {
            dispatch(uiActions.toggleMenu());
        }
        if(showDateList) {
            dispatch(uiActions.toggleDateList());
        }
    }
    
    return (
        <div className='app' onClick={closeMenusHandler}>
            <Routes />
        </div>
    );
}

export default App;
