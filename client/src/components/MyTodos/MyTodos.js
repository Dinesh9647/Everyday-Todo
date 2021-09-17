import { useSelector } from 'react-redux';

import TodosByDate from './TodosByDate';
import TodoList from '../TodoList/TodoList';

import classes from './MyTodos.module.css';
import FilterTodos from './FilterTodos';

const MyTodos = (props) => {
    const todos = useSelector((state) => state.todo.todos);
    const clickedDate = useSelector((state) => state.todo.clickedDate);
    let filteredTodos = todos.filter((todo) => todo.date === clickedDate);
    filteredTodos = filteredTodos.sort((a, b) => {
        let aa = a.time.split(':'),
            bb = b.time.split(':');

        return aa[0] - bb[0] || aa[1] - bb[1];
    });

    return (
        <div className={`${classes['my-todos']} ${!props.isCurrent ? classes.hide : ''}`}>
            <header className={classes.header}>
                <h1>My Todos</h1>
                <TodosByDate
                    todos={filteredTodos}
                />
            </header>
            <TodoList
                todos={filteredTodos}
            />
            <footer className={classes.footer}>
                <FilterTodos />
            </footer>
        </div>
    );
}

export default MyTodos;