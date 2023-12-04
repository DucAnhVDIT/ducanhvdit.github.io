import React, { Component } from 'react';
import { CheckboxToggle } from 'react-rainbow-components';

interface RequireLocksState {
  value: boolean;
}

class RequireLocks extends Component<{}, RequireLocksState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      value: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    this.setState((prevState) => ({ value: !prevState.value }));
  }

  render() {
    return (
      <div>
        <CheckboxToggle
                id="require-lock"
                label="Require Locks"
                value={this.state.value}
                onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default RequireLocks;
