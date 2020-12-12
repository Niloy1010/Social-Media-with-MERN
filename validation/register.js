const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = (data) => {
  let errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.cpassword = isEmpty(data.cpassword) ? "" : data.cpassword;

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name must be between 2 and 20";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is empty";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Not a valid email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please Enter a passoword";
  }
  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be atleast 6 characters";
  }
  if (Validator.isEmpty(data.cpassword)) {
    errors.cpassword = "Please Re-enter password";
  }
  if (data.cpassword !== data.password) {
    errors.cpassword = "Passwords don't match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
module.exports = validateRegisterInput;
