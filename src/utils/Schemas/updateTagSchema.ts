import { checkSchema } from 'express-validator';

export const updateTagSchema = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'Nome deve ser uma string.'
  },
  priority: {
    in: ['body'],
    isIn: {
      options: [['baixo', 'médio', 'alto']],
      errorMessage: 'Prioridade deve ser "baixo", "médio" ou "alto".'
    },
    optional: true
  }
});