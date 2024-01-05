import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function DropDown() {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div >
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        style={{width:'300px'}}
      >
        <MenuItem value="" disabled>
          Select a date
        </MenuItem>
        <MenuItem value="option1">23 Sep 2023 07:30pm</MenuItem>
        <MenuItem value="option2">24 Sep 2023 07:30pm</MenuItem>
        <MenuItem value="option3">25 Sep 2023 07:30pm</MenuItem>
      </Select>
    </div>
  );
}

export default DropDown;
