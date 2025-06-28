import { checkSchema } from 'express-validator';

export const updateUserSchema = checkSchema({
  name: {
    in: ['body'],
    optional: true, 
    isString: true,
    errorMessage: 'Nome deve ser uma string.',
  },
  email: {
    in: ['body'],
    optional: true,
    isEmail: true,
    normalizeEmail: true,
    errorMessage: 'E-mail inválido.',
  },
  passwordHash: {
    in: ['body'],
    optional: true,
    isString: true,
    isLength: {
      options: { min: 6 },
    },
    errorMessage: 'Senha inválida. Deve ter pelo menos 6 caracteres.',
  },
});
