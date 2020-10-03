const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateLoginInput = (data) => {
  let errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is empty";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Not a valid email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please Enter a passoword";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLoginInput;
