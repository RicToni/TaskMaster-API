import { checkSchema } from 'express-validator';

export const createTagSchema = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    notEmpty: { errorMessage: 'Nome da tag é obrigatório.' },
    errorMessage: 'Nome deve ser uma string.'
  },
  priority: {
    in: ['body'],
    isIn: {
      options: [['baixo', 'médio', 'alto']],
      errorMessage: 'Prioridade deve ser "baixo", "médio" ou "alto".'
    },
    notEmpty: { errorMessage: 'Prioridade é obrigatória.' }
  }
});