import { useDispatch } from 'react-redux';

import { deleteSingleTodo, updateSingleTodo } from '../../actions/todos';

import classes from './TodoItem.module.css';

const TodoItem = (props) => {
    const dispatch = useDispatch();

    const completeHandler = () => {
        dispatch(updateSingleTodo(props.id));
    };

    const deleteHandler = () => {
        dispatch(deleteSingleTodo(props.id));
    };

    return (
        <li className={classes.todo}>
            <div className={classes['todo-item']}>
                <div className={classes['todo-desc']}>
                    <p className={`${classes['todo-text']} ${props.completed ? classes.completed : ''}`}>{props.text}</p>
                    <p className={`${classes['todo-date']} ${props.completed ? classes.completed : ''}`}>{props.time}</p>
                </div>
                <button className={classes['complete-btn']} onClick={completeHandler}>
                    <i className='fas fa-check'></i>
                </button>
                <button className={classes['delete-btn']} onClick={deleteHandler}>
                    <i className='fas fa-trash'></i>
                </button>
            </div>
        </li>
    );
};

export default TodoItem;