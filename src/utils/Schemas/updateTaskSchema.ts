import { checkSchema } from 'express-validator';

export const updateTaskSchema = checkSchema({
  title: {
    in: ['body'],
    optional: true,
    isString: true,
    errorMessage: 'Título deve ser uma string.',
  },
  description: {
    in: ['body'],
    optional: true,
    isString: true,
    errorMessage: 'Descrição deve ser uma string.',
  },
  completed: {
    in: ['body'],
    optional: true,
    isBoolean: true,
    errorMessage: 'O campo "completed" deve ser um booleano.',
  },
  userId: {
    in: ['body'],
    optional: true,
    isInt: true,
    errorMessage: 'userId deve ser um número inteiro.',
  },
  tagIds: {
    in: ['body'],
    optional: true,
    isArray: true,
    errorMessage: 'tagIds deve ser um array de números.',
  },
  'tagIds.*': {
    in: ['body'],
    optional: true,
    isInt: true,
    errorMessage: 'Cada tagId deve ser um número inteiro.',
  },
});
