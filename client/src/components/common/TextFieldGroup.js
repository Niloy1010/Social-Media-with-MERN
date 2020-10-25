import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    type,
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
    disabled 
}) => {
    return (
        <div className="form-group">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value = {value}
            onChange = {onChange}
            disabled={disabled}
            className = {classnames('form-control form-control-lg', {
              "is-invalid" : error
            })}
          />
          {info ? (<small className="form-text text-muted">{info}</small>): null}
            {error ? (<div className="invalid-feedback">*{error}</div>) : null}
        </div>
    )
}

TextFieldGroup.defaultProps = {
  type : "text"
}

TextFieldGroup.propTypes = {
    name : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value : PropTypes.string.isRequired,
    info : PropTypes.string,
    error : PropTypes.string,
    type : PropTypes.string.isRequired,
    label : PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}
export default TextFieldGroup;