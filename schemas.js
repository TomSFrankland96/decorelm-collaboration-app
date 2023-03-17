const BaseJoi = require('joi');
const { number } = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value })
        return clean;
      }
    }
  }
});

const Joi = BaseJoi.extend(extension);

module.exports.projectSchema = Joi.object({
  project: Joi.object({
    title: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    description: Joi.string().required().escapeHTML()
  }).required()
});

module.exports.roomSchema = Joi.object({
  room: Joi.object({
    title: Joi.string().required().escapeHTML(),
    render: Joi.string().optional().allow('')
  }).required()
})

module.exports.itemCategorySchema = Joi.object({
  itemCategory: Joi.object({
    name: Joi.string().required(),
  }).required(),
})

module.exports.itemSchema = Joi.object({
  item: Joi.object({
    name: Joi.string().required(),
    link: Joi.string().required(),
    price: Joi.string().optional().allow(''),
    brand: Joi.string().required(),
    recommended: Joi.string().optional().allow(''),
    comment: Joi.string().optional().allow('')
  }),
  deleteImages: Joi.array(),
})

module.exports.designSchema = Joi.object({
  design: Joi.object({
    name: Joi.string().required(),
    notes: Joi.string().optional()
  })
})