const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateEducationInput = (data) => {
  let errors = {};

  data.school = isEmpty(data.school) ? "" : data.school;
  data.degree = isEmpty(data.degree) ? "" : data.degree;
  data.subject = isEmpty(data.subject) ? "" : data.subject;
  data.from = isEmpty(data.from) ? "" : data.from;

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is empty";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "degree field is empty";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "subject field is empty";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "from field is empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateEducationInput;
