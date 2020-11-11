const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostImageInput(req)  {
    let  errors = {};
    req.body.text = !isEmpty(req.body.text) ? req.body.text : '';
    req.file = !isEmpty(req.file) ? req.file : '';
    console.log(req.body.text);
    if(!Validator.isLength(req.body.text, {min:1, max:300})) {
        console.log("INside second if");
        errors.text = 'Post must be between 1 and 300 characters'
    }
    if(Validator.isEmpty(req.body.text)) {
        console.log("INside first if");
        errors.text = 'Please Add a Caption';
    }
  
    if(isEmpty(req.file)) {
        console.log("In file");
            errors.text = "Please Enter an Image file";
        }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}