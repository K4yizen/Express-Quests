const Joi = require("joi");

const validateMovie = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(255).required().messages({
      "string.empty": "This field is required",
      "string.max": "Should contain less than 255 characters",
    }),
    director: Joi.string().required().messages({
      "string.empty": "This field is required",
    }),
    year: Joi.string().required().messages({
      "string.empty": "This field is required",
    }),
    color: Joi.string().required().messages({
      "string.empty": "This field is required",
    }),
    duration: Joi.string().required().messages({
      "string.empty": "This field is required",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const validationErrors = error.details.map((err) => {
      return {
        field: err.context.key,
        message: err.message,
      };
    });
    res.status(422).json({ validationErrors });
  } else {
    next();
  }
};

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required().messages({
      "string.empty": "This field is required",
      "string.email": "Invalid email",
      "string.max": "Should contain less than 255 characters",
    }),
    firstname: Joi.string().max(255).required().messages({
      "string.empty": "This field is required",
      "string.max": "Should contain less than 255 characters",
    }),
    lastname: Joi.string().max(255).required().messages({
      "string.empty": "This field is required",
      "string.max": "Should contain less than 255 characters",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const validationErrors = error.details.map((err) => {
      return {
        field: err.context.key,
        message: err.message,
      };
    });
    res.status(422).json({ validationErrors });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
