const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTrackInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.artist = !isEmpty(data.artist) ? data.artist : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }

  if (Validator.isEmpty(data.artist)) {
    errors.artist = "artist field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
