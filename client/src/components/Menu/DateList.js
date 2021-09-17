import { useSelector } from 'react-redux';
import { v4 as uuidv4} from 'uuid';

import classes from './DateList.module.css';

import currentDate from '../../utils/currentDate';
import DateItem from './DateItem';

const DateList = () => {
    const todos = useSelector((state) => state.todo.todos);
    
    const curr_date = currentDate();
    const date_stats = {};
    date_stats[curr_date] = 0;
    todos.forEach((todo) => {
        if(!(todo.date in date_stats)) {
            date_stats[todo.date] = 1;
        }
        else {
            date_stats[todo.date]++;
        }
    });

    const sorted_dates = Object.keys(date_stats).sort((a, b) => {
        let aa = a.split('-'),
            bb = b.split('-');
        return aa[2] - bb[2] || aa[1] - bb[1] || aa[0] - bb[0];
    });
    
    return (
        <div className={`${classes['date-list']}`}>
            <ul className={classes.dates}>
                {sorted_dates.map((date) => (
                    <DateItem
                        key={uuidv4()}
                        date={date === curr_date ? 'Today' : date}
                        todos_cnt={date_stats[date]}
                    />
                ))}
            </ul>
        </div>
    );
};

export default DateList;