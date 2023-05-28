import path from 'path'
import express from "express"
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import * as dotenv from 'dotenv'

import { registerValidation, loginValidation, postCreateValidation } from "./validations/index.js"
import { checkAuth, handleValidationErrors } from './utils/index.js'
import { UserController, PostController } from './controllers/index.js' 

dotenv.config({ path: '.env' })

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB successfuly connected'))
  .catch((err) => console.log('DB failed to connect', err))

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix+ path.extname(file.originalname))
  },
})

const upload = multer({ 
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: function(req, file, cb) {
    checkFileTypes(file, cb)
  }
})

const checkFileTypes = (file, cb)  =>  {
  const fileTypes = /jpeg|png|jpg/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)
  if (mimetype && extname) return cb(null, true)
  cb('Please upload images only')
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/signup', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.remove)


app.listen(8000, (err) => {
  if (err) console.log(err)
  console.log('Server is OK')
})