const Joi = require("joi");

const shapes = [
  "round",
  "princess",
  "emerald",
  "asscher",
  "marquise",
  "oval",
  "radiant",
  "pear",
  "heart",
  "cushion",
];
const colors = ["d", "e", "f", "g", "h", "i", "j"];
const clarities = ["if", "vvs1", "vvs2", "vs1", "vs2", "si1", "si2"];
const cuts = ["excellent", "very good", "good", "fair"];

const diamondArgsSchema = Joi.object({
  price: Joi.number().optional(),
  shape: Joi.string()
    .valid(...shapes)
    .optional(),
  color: Joi.string()
    .valid(...colors)
    .optional(),
  clarity: Joi.string()
    .valid(...clarities)
    .optional(),
  carat: Joi.number().optional(),
  cut: Joi.string()
    .valid(...cuts)
    .optional(),
  isLabDiamond: Joi.boolean().optional(),
  offset: Joi.number().min(0).optional(),
  limit: Joi.number().min(1).optional(),
});

module.exports = {
  diamondArgsSchema,
};
