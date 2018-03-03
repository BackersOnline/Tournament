import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import Store from '../../../store';
import 'react-dates/initialize';

class DateWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
      date: null,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ date });
    Store.dispatch({ type: 'UPDATE_DATE', payload: date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    return (
      <div>
        <SingleDatePicker 
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          focused={this.state.focused}
          date={this.state.date}
          id="date_input"
        />
      </div>
    )
  }
}

export default DateWrapper;