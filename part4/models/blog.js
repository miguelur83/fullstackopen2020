const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: String,
  url: {
    type: String,
    required: [true, 'URL is required']
  },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    if (returnedObject.likes === undefined){
      returnedObject.likes = 0
    }
  }
})

module.exports = mongoose.model('Blog', blogSchema)