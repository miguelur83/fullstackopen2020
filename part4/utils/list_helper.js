const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((fav, current) => current.likes > fav.likes ? current : fav)
}

const mostBlogs = (blogs) => {
  var count = []
  var maxAuthor = ''
  blogs.forEach((val)=>{
    maxAuthor = val.author
    count[maxAuthor] = count[maxAuthor] ? count[maxAuthor] + 1 : 1
  })
  returnValue = {author:maxAuthor, blogs:count[maxAuthor]}
  return returnValue
}

const mostLikes = (blogs) => {
  var likes = []
  var maxAuthor = ''

  blogs.forEach((val)=>{
    likes[val.author] = likes[val.author] ? likes[val.author] + val.likes  : val.likes
    maxAuthor = maxAuthor ? ((likes[maxAuthor] < likes[val.author]) ? val.author : maxAuthor) : val.author
  })
  returnValue = {author:maxAuthor, likes:likes[maxAuthor]}
  return returnValue
}
  
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}