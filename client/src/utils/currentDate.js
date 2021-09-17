
const currentDate = () => {
    const offset = new Date().getTimezoneOffset();
    const currDate = new Date(new Date().getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];
    const [year, month, date] = currDate.split('-');
    
    return date + '-' + month + '-' + year;
};

export default currentDate;