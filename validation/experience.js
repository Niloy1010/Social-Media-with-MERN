const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateExperienceInput = (data) => {
  let errors = {};

  data.title = isEmpty(data.title) ? "" : data.title;
  data.company = isEmpty(data.company) ? "" : data.company;
  data.from = isEmpty(data.from) ? "" : data.from;

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is empty";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "company field is empty";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "from field is empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateExperienceInput;
