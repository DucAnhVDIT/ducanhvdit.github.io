import React, { useState } from 'react';
import { Picklist, Option } from 'react-rainbow-components';

const containerStyles = {
  width: '200px',
};

export default function AppointmentStatus() {
const initialState = { value: 'option 1'  };
  const [statusValue, setStatusValue] = useState(initialState);

  return (
    <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">
      <div className="rainbow-flex rainbow-align_right">
        <Picklist
          id="picklist-3"
          // style={containerStyles}
          // onChange={(value) => setStatusValue(value)}
          value={statusValue}
          hideLabel
          enableSearch
        >
          <Option name="option 1" label="Confirmed" />
          <Option name="option 2" label="Not Confirmed" />
          <Option name="option 3" label="Left Message" />
          <Option name="option 4" label="No Show" />
          <Option name="option 5" label="Late" />
          <Option name="option 6" label="Cancelled" />
          <Option name="option 7" label="Arrived" />
          <Option name="option 8" label="Served" />
          <Option name="option 9" label="Done" />
        </Picklist>
      </div>
    </div>
  );
}
