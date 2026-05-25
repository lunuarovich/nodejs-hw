import { Joi, Segments } from 'celebrate';

export const updateCurrentUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim().min(1).max(50).required(),
  }),
};
