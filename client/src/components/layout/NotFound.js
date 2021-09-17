import { Link } from 'react-router-dom';

import classes from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={classes['not-found']}>
            <span className="far fa-frown"></span>
            <div className={classes.message}>
                <h1>404</h1>
                <h2>OOPS! PAGE NOT FOUND</h2>
                <p>
                    Sorry, but the page you are looking for does 
                    not exist or is temporarily unavailable.
                </p>
                <Link className={classes.link} to='/login'>Back to homepage</Link>
            </div>
        </div>
    );
};

export default NotFound;