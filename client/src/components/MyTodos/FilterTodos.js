import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { todoActions } from '../../slices/todo-slice';
import { updateAllTodos ,deleteAllTodos } from '../../actions/todos';

import classes from './FilterTodos.module.css';

const FilterTodos = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.todo.filter);
    const clickedDate = useSelector((state) => state.todo.clickedDate);

    const filterChangeHandler = (e) => {
        if(e.target.name !== filter) {
            dispatch(todoActions.setFilter({ filter: e.target.name }));
        }
    };

    const finishAllHandler = () => {
        dispatch(updateAllTodos(clickedDate));
    };

    const deleteAllHandler = () => {
        dispatch(deleteAllTodos(clickedDate));
    };

    return (
        <Fragment>
            <div className={classes.filterby}>
                <button
                    name='all'
                    className={`${filter === 'all' ? classes.active : ''}`}
                    onClick={filterChangeHandler}
                >
                    All
                </button>
                <button
                    name='done'
                    className={`${filter === 'done' ? classes.active : ''}`}
                    onClick={filterChangeHandler}
                >
                    Done
                </button>
                <button
                    name='rem'
                    className={`${filter === 'rem' ? classes.active : ''}`}
                    onClick={filterChangeHandler}
                >
                    Remaining
                </button>
            </div>
            <div className={classes['change-todos']}>
                <button
                    title='Finish All'
                    onClick={finishAllHandler}
                >
                    <span className="fas fa-check"></span>
                    <p>Finish All</p>
                </button>
                <button
                    title='Delete All'
                    onClick={deleteAllHandler}
                >
                    <span className="fas fa-trash"></span>
                    <p>Delete All</p>
                </button>
            </div>
        </Fragment>
    );
}

export default FilterTodos;