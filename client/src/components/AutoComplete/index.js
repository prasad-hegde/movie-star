import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormElement } from '../../commonStyle';


export default function AutoComplete({ options, label,multiple=false }) {

  return (
    <FormElement>
      <Autocomplete
        id="combo-box-demo"
        options={options.map((option) => option.title)}
        fullWidth
        multiple={multiple}
        autoComplete
        limitTags={4}
        renderInput={(params) => <TextField {...params} label={label}/>}
        />
    </FormElement>
  );
}