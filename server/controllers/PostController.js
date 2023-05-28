import PostModel from "../models/Post.js"

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось получить статьи'
    })
  }
}

export const create = async (req, res) => {
  try {
     const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
     })

     const post = await doc.save()

     res.json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось создать статью'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id
    const doc = await PostModel.findOneAndUpdate(
      { _id: postId, },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )
    if (!doc) {
      return res.status(404).json({
        message:  'Статья не найдена'
      })
    }

    res.json(doc)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось получить статьи'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id
    const doc = await PostModel.findOneAndDelete({ _id: postId, })
    if (!doc) {
      return res.status(500).json({
        message:  'Не удалось удалить статью'
      })
    }

    res.json(doc)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось получить статьи'
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id
    const updatedPost = {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    }
    
    const doc = await PostModel.findByIdAndUpdate({ _id: req.params.id }, updatedPost)
    
    const post = await doc.save()

    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось обновить статью'
    })
  }
}
