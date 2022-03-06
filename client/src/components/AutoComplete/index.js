import { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormHelperText } from '@mui/material';
import { FormElement } from '../../commonStyle';


export default function AutoComplete({ options, label,multiple=false,value,onChange ,submitFlag,hasError,required}) {
  const [error, setError] = useState(false);

  function validate() {
    if (!required) {
      return;
    }
    if (multiple) {
        setError(value.length < 1);
    } else {
        setError(!value)
    }
  }

  useEffect(() => {
    if (submitFlag) {
        validate();
    }
}, [submitFlag])

useEffect(() => {
    hasError(error);
},[error])

  return (
    <FormElement style={{flexDirection:'column'}}>
      <Autocomplete
        id="combo-box-demo"
        options={options.map((option) => option.title)}
        fullWidth
        value={value}
        multiple={multiple}
        autoComplete
        limitTags={4}
        onChange={(_event,value)=>onChange(value)}
        renderInput={(params) => <TextField {...params} label={label} />}
        required={required}
        error={error}
        onBlur={()=>validate()}
      />
      <FormHelperText error={error}>{error?'This is a required field':''}</FormHelperText>
    </FormElement>
  );
}