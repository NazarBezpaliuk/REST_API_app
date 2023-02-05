const Joi = require("joi");


const signUpAndLoginJoiSchema = Joi.object({
    password: Joi.string().min(6).required().messages({
      "any.required": "Please, you should provide password!",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Please, you should provide email!",
    }),
    subscription: Joi.string().valid("starter", "pro", "business"),
  });
  
  const subscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  module.exports = {
    signUpAndLoginJoiSchema,
    subscriptionJoiSchema,
  }