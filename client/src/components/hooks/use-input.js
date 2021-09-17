import { useState } from "react"

const useInput = (inputValidator) => {
    const [value, setValue] = useState('');
    const isInputValid = inputValidator(value);
    const inputChangeHandler = (e) => {
        setValue(e.target.value);
    };
    const clearInput = () => {
        setValue('');
    }

    return {
        value,
        isInputValid,
        inputChangeHandler, 
        clearInput
    };
};

export default useInput;