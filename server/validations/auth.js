import { body } from 'express-validator' 

export const registerValidation = [
  body('email', 'Неверные формат почты').isEmail(),
  body('password', 'Пароль должен состоять минимум из 5 символов').isLength({ min: 5 }),
  body('name', 'Укажите имя').isLength({ min: 3 }),
  body('birthDate', 'Укажите дату рождения').isLength({ min: 3 }),
  body('gender', 'Укажите пол'),
  body('photo', 'Загрузите фото').custom((value, {req}) => {
    console.log(value, req.body.photo)
    if (!value) throw new Error('Поле "photo" является обязательным')
    const extension = path.extname(value).toLowerCase();
    console.log(extension)
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    if (!validExtensions.includes(extension)) throw new Error('Неверная ссылка на аватарку')
    return true;
  })
]