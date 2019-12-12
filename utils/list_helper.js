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

const mostBlogs = (blogs) => {
  const authorList = []
  for(blog of blogs){
    let blogExists = false
    for(let i = 0; i<authorList.length; i++){
      if(authorList[i].author === blog.author){
        blogExists = true
        authorList[i].blogs = authorList[i].blogs + 1
      }
    }
    if(!blogExists){
      authorList.push({author: blog.author, blogs: 1})
    }
  }
  const reducer = (mostBlogs, nextBlog) => {
    if(nextBlog.blogs > mostBlogs.blogs){
      return nextBlog
    }
  }

  return authorList.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs
}