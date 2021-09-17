import { useSelector, useDispatch } from 'react-redux';
import currentDate from '../../utils/currentDate';

import classes from './TodosByDate.module.css';

import DateList from '../Menu/DateList';
import { uiActions } from '../../slices/ui-slice';

const TodosByDate = ({ todos }) => {
    const dispatch = useDispatch();
    const showDateList = useSelector((state) => state.ui.showDateList);
    const clickedDate = useSelector((state) => state.todo.clickedDate);

    const showListHadler = () => {
        if(!showDateList) {
            dispatch(uiActions.toggleDateList());
        }
    }

    const remTodosCnt = todos.reduce((accumulator, current) => (
        accumulator + !current.completed
    ), 0);

    return (
        <div className={classes['date-stats']}>
            <div className={classes.date}>
                <p>{clickedDate === currentDate() ? 'Today' : clickedDate}</p>
                <button onClick={showListHadler}>
                    <i className="fas fa-sort-down"></i>
                </button>
            </div>
            {showDateList && <DateList />}
            <div className={classes['remaining-task']}>
                <p>Remaining {remTodosCnt} of {todos.length}</p>
            </div>
        </div>
    );
}

export default TodosByDate;