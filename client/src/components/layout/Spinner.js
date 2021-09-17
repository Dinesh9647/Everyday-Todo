import { Fragment } from "react";

import spinner from '../../assets/spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img 
                src={spinner}
                style={{ width: '150px' }}
                alt="Loading..."
            />
        </Fragment>
    );
};

export default Spinner;