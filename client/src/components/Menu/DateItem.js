import { useSelector, useDispatch } from 'react-redux';
import { todoActions } from '../../slices/todo-slice';
import currentDate from '../../utils/currentDate';

import classes from './DateItem.module.css';

const DateItem = (props) => {
    const dispatch = useDispatch();
    const clickedDate = useSelector((state) => state.todo.clickedDate);

    const setDateHandler = () => {
        if(props.date === 'Today') {
            dispatch(todoActions.setDate({ date: currentDate() }));
        }
        else {
            dispatch(todoActions.setDate({ date: props.date }));
        }
    };

    const tempClass = (clickedDate === props.date || (props.date === 'Today' && clickedDate === currentDate())) ? classes.active : ''; 

    return (
        <li className={`${classes['date-task']} ${tempClass}`} 
            onClick={setDateHandler}
        >
            <div className={classes['date-stat']}>
                <span>{props.date}</span>
                <span>{props.todos_cnt}</span>
            </div>
        </li>
    );
};

export default DateItem;