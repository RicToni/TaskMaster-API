
import { checkSchema } from 'express-validator';

export const createTaskSchema = checkSchema({
  title: {
    in: ['body'],
    isString: true,
    notEmpty: {
      errorMessage: 'O título é obrigatório.',
    },
    errorMessage: 'Título inválido.',
  },
  description: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Descrição deve ser uma string.',
  },
  completed: {
    in: ['body'],
    isBoolean: true,
    optional: true,
    errorMessage: 'O campo "completed" deve ser um booleano.',
  },
  userId: {
    in: ['body'],
    isInt: true,
    notEmpty: {
      errorMessage: 'O userId é obrigatório.',
    },
    errorMessage: 'userId deve ser um número inteiro.',
  },
  tagIds: {
    in: ['body'],
    isArray: true,
    optional: true,
    errorMessage: 'tagIds deve ser um array de números.',
  },
  'tagIds.*': {
    isInt: true,
    optional: true,
    errorMessage: 'Cada tagId deve ser um número inteiro.',
  },
});