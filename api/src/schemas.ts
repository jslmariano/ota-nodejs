import Joi from 'joi';

const schemas = {
  notePOST: Joi.object().keys({
    title: Joi.string().min(3).max(30).required(),
    body: Joi.string().required(),
  }),
  noteUPDATE: Joi.object().keys({
    title: Joi.string().min(3).max(30),
    body: Joi.string(),
  }),
  noteDETAILS: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
};

export default schemas;
