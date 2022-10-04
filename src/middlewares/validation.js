const Joi = require("joi");
const validNum = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
module.exports = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().pattern(validNum).required(),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
  favoriteValidation:(req, res, next) => {
    const schemaFavorite = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schemaFavorite.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  }
};