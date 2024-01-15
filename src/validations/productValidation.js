import joi from 'joi';

const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  quantity: joi.string().required(),
  expireDate: joi.date().required(),
});
export default productSchema;
