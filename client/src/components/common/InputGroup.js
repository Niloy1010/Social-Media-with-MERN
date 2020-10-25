import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';

const InputGroup = ({
    type,
    name,
    placeholder,
    value,
    error,
    icon,
    onChange,
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
          <input
            placeholder={placeholder}
            name={name}
            value = {value}
            onChange = {onChange}
            className = {classnames('form-control form-control-lg', {
              "is-invalid" : error
            })}
          />
            {error ? (<div className="invalid-feedback">*{error}</div>) : null}
        </div>
    )
}

InputGroup.defaultProps = {
    type : "text"
}

InputGroup.propTypes = {
    name : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value : PropTypes.string,
    icon : PropTypes.string,
    error : PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func
}
export default InputGroup;