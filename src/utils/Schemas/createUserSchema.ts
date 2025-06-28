import { checkSchema } from 'express-validator';

export const createUserSchema = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    notEmpty: {
      errorMessage: 'O nome é obrigatório.',
    },
    errorMessage: 'Nome deve ser uma string.',
  },
  email: {
    in: ['body'],
    isEmail: true,
    normalizeEmail: true,
    notEmpty: {
      errorMessage: 'O e-mail é obrigatório.',
    },
    errorMessage: 'E-mail inválido.',
  },
  passwordHash: {
    in: ['body'],
    isString: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'A senha deve ter pelo menos 6 caracteres.',
    },
    notEmpty: {
      errorMessage: 'A senha é obrigatória.',
    },
    errorMessage: 'Senha inválida.',
  },
});
