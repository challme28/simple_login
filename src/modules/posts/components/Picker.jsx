// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'

type Props = {
  +value: string,
  +onChange: Function,
  +options: Array<string>,
}
export default class Picker extends Component<Props> {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={event => onChange(event)} value={value}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};