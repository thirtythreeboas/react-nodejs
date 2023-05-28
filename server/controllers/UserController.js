import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      passwordHash: hash,
      name: req.body.name,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      photo: req.body.photo
    })
    
    const user = await doc.save()

    const token = jwt.sign(
      { _id: user._id },
      'encryptionKey',
      { expiresIn: '30d' }
    )

    const { passwordHash, ...userData } = user._doc
    res.json({
      ...userData,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) return res.status(404).json({
      message: 'Почта или пароль неверны, либо вы не зарегистрированы на сайте'
    })

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
    if (!isValidPass) return res.status(404).json({
      message: 'Почта или пароль неверны, либо вы не зарегистрированы на сайте'
    })

    const token = jwt.sign(
      {
        _id: user._id
      },
      'encryptionKey',
      {
        expiresIn: '30d'
      }
    )

    const { passwordHash, ...userData } = user._doc
    res.json({
      ...userData,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось авторизоваться'
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) return res.status(404).json({
      message: 'Пользователь не найден'
    })
    const { passwordHash, ...userData } = user._doc
    res.json(userData)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Нет доступа'
    })
  }
}