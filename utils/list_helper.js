const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sum, nextBlogLikes) => sum + nextBlogLikes.likes

  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}