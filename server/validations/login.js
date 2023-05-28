import { body } from 'express-validator' 

export const loginValidation = [
  body('email', 'Неверные формат почты').isEmail(),
  body('password', 'Пароль должен состоять минимум из 5 символов').isLength({ min: 5 }),
]
