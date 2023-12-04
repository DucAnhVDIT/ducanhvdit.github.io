import React, { useState } from 'react';
import { Picklist, Option } from 'react-rainbow-components';

const containerStyles = {
  width: '200px',
};

export default function AppointmentStatus() {
const initialState = { value: null };
  const [statusValue, setStatusValue] = useState(initialState);

  return (
    <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">
      <div className="rainbow-flex rainbow-align_right">
        <Picklist
          id="picklist-3"
          style={containerStyles}
          placeholder="Choose Building"
          onChange={(value) => setStatusValue(value)}
          value={statusValue}
          label="Select Building"
          hideLabel
          enableSearch
        >
          <Option name="option 1" label="All Buildings" />
          <Option name="option 2" label="New Building" />
          <Option name="option 3" label="Experimental" />
          <Option name="option 4" label="Bennet Towers" />
          <Option name="option 5" label="Empire State" />
          <Option name="option 6" label="Central Park" />
          <Option name="option 7" label="Chrysler" />
          <Option name="option 8" label="Plaza" />
        </Picklist>
      </div>
    </div>
  );
}
