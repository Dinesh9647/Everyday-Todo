import { useState } from 'react';
import { useDispatch } from 'react-redux'
import validator from 'validator';

import classes from './TodoForm.module.css';

import { addTodo } from '../../actions/todos';
import useInput from '../hooks/use-input';

const TodoForm = (props) => {
    const [hasSubmitted, sethasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const { 
        value: text,
        isInputValid: isTextValid,
        inputChangeHandler: textChangeHandler,
        clearInput: clearText
    } = useInput((text) => text.trim() !== '');

    const { 
        value: date,
        isInputValid: isDateValid,
        inputChangeHandler: dateChangeHandler,
        clearInput: clearDate
    } = useInput((date) => validator.isDate(date));

    const { 
        value: time,
        isInputValid: isTimeValid,
        inputChangeHandler: timeChangeHandler,
        clearInput: clearTime
    } = useInput((time) => time.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/));

    const todoSubmitHandler = (e) => {
        e.preventDefault();
        sethasSubmitted(true);
        if(isTextValid && isDateValid && isTimeValid) {
            sethasSubmitted(false);
            dispatch(addTodo(text, date, time));
            clearText();
            clearDate();
            clearTime();
        }
    };

    return (
        <div className={`${classes.addtodo} ${props.isCurrent ? classes.show : ''}`}>
            <header className={`${classes.header}`}>
                <h1>Add Todo</h1>
            </header>
            <form className={classes['todo-form']} onSubmit={todoSubmitHandler}>
                <div className={classes['todo-inputs']}>
                    <input 
                        className={`${(hasSubmitted && !isTextValid) ? classes.invalid : ''}`}
                        type="text"
                        placeholder="Enter a todo"
                        value={text}
                        onChange={textChangeHandler}
                    />
                    {hasSubmitted && !isTextValid && <p className={classes.warning}>Please enter a todo</p>}
                    <input 
                        className={`${(hasSubmitted && !isDateValid) ? classes.invalid : ''}`}
                        type="text"
                        onFocus={(e) => (e.currentTarget.type="date")} 
                        onBlur={(e) => (e.currentTarget.type="text")}
                        placeholder="Select a date"
                        value={date}
                        onChange={dateChangeHandler}
                    />
                    {hasSubmitted && !isDateValid && <p className={classes.warning}>Please enter a valid date</p>}
                    <input 
                        className={`${(hasSubmitted && !isTimeValid) ? classes.invalid : ''}`}
                        type="text"
                        onFocus={(e) => (e.currentTarget.type="time")} 
                        onBlur={(e) => (e.currentTarget.type="text")}
                        placeholder="Select a time"
                        value={time}
                        onChange={timeChangeHandler}
                    />
                    {hasSubmitted && !isTimeValid && <p className={classes.warning}>Please enter a valid time</p>}
                </div>
                <button type="submit" className={classes.submit}>Add To List</button>
            </form>
        </div>
    );
};

export default TodoForm;