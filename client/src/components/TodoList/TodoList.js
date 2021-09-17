import { useSelector } from 'react-redux';

import classes from './TodoList.module.css';

import TodoItem from './TodoItem';
import currentDate from '../../utils/currentDate';

const TodoList = ({ todos }) => {
    const filter = useSelector((state) => state.todo.filter);
    const clickedDate = useSelector((state) => state.todo.clickedDate);
    let filteredTodos = todos;
    if(filter !== 'all') {
        filteredTodos = todos.filter((todo) => todo.completed === (filter === 'done'));
    }

    return (
        <div className={classes['todo-container']}>
            {filter === 'all' && clickedDate === currentDate() && filteredTodos.length === 0 && 
                <p className={classes.notask}>No Todos for Today</p>
            }
            {(filter !== 'all' || clickedDate !== currentDate()) && filteredTodos.length === 0 && 
                <p className={classes.notask}>No Todos</p>
            }
            {filteredTodos.length !==0 && 
                <ul className={classes['todo-list']}>
                    {filteredTodos.map((todo) => 
                        <TodoItem
                            key={todo._id}
                            id={todo._id}
                            text={todo.text}
                            time={todo.time}
                            completed={todo.completed}
                        />
                    )}
                </ul>
            }
        </div>
    );
}

export default TodoList;