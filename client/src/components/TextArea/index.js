import TextField from '@mui/material/TextField';
import {useState } from 'react';
import { FormElement } from '../../commonStyle';

const textFormat = {
    hhmm: {
        isValid: (str) => /(0?[0-9]|1[0-9]|2[0-3])h (0?[0-9]|[1-5][0-9])min/.test(str),
        errorText:'Invalid format : example 2h 25min '
    },
    required: {
        errorText:'This is a required field'
    },
    default: {
        isValid: () => true,
        errorText:''
    }
    
}

export default function TextArea(props) {
    
    const { label = "label",
        multiline = false, format = 'default',
        required = false } = props;
    
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    function validate() {
        if (!value && required) {
            setError(true);
            setHelperText(textFormat.required.errorText)
        } else {
            if (!required && !value) {
                setError(false);
                setHelperText('');
                return;
            }
            const isValid = textFormat[format].isValid(value);
            if (isValid) {
                setError(false);
                setHelperText('');
            } else {
                setError(true);
                setHelperText(textFormat[format].errorText);
            }
        }
    }

    function handleOnChange(value) {
        setValue(value);
    }
    
    return (
        <FormElement>
            <TextField
                fullWidth id="outlined-basic"
                label={label} variant="outlined"
                maxRows={6}
                value={value}
                multiline={multiline}
                error={error}
                helperText={helperText}
                required={required}
                onChange={(event=>handleOnChange(event.target.value))}
                onBlur={validate}
            />
        </FormElement>
    )
}