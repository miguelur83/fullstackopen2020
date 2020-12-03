const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((fav, current) => current.likes > fav.likes ? current : fav)
}
  
module.exports = {
  dummy, totalLikes, favoriteBlog
}