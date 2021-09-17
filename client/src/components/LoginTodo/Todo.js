import { useState } from 'react';
import { useSelector } from 'react-redux';

import Menu from '../Menu/Menu';
import MyTodos from '../MyTodos/MyTodos';
import TodoForm from '../TodoForm/TodoForm';
import Spinner from '../layout/Spinner';

import classes from './Todo.module.css';

const Todo = () => {
    const [currentPage, setCurrentPage] = useState('mytodos'); 
    const isLoading = useSelector((state) => state.auth.loading);
    const showMyTodosHandler = () => {
        if(currentPage !== 'mytodos') {
            setCurrentPage('mytodos');
        }
    }
    const showAddTodoHandler = () => {
        if(currentPage !== 'addtodo') {
            setCurrentPage('addtodo');
        }
    }
    if(isLoading) {
        return <Spinner />;
    }
    return (
        <div className={classes['todo-body']}>
            <Menu 
                onClickMyTodos={showMyTodosHandler}
                onClickAddTodo={showAddTodoHandler}
            />
            <MyTodos isCurrent={currentPage === 'mytodos'} />
            <TodoForm isCurrent={currentPage === 'addtodo'} />
        </div>
    );
};

export default Todo;