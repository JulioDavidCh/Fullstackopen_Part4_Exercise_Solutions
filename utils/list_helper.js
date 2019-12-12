const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sum, nextBlogLikes) => sum + nextBlogLikes.likes

  return blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  const reducer = (mostLiked, nextBlog) => {
    if(nextBlog.likes > mostLiked.likes){
      return nextBlog
    }else{
      return mostLiked
    }
  }
  return blogs.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}