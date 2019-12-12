const listhelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

// --------------- DUMMY TEST --------------

test('Dummy test', () => {
  const result = listhelper.dummy(blogs)
  expect(result).toBe(1)
})

// --------------- TOTAL LIKES TEST ---------------

describe('Total likes', () => {

  test('when list is empty, likes equals zero', () => {
    const result = listhelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listhelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs, is calculated right', () => {
    const result = listhelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

// --------------- MOST LIKED TEST ---------------

describe('Most liked', () => {

  test('when list is empty, most liked equals empty object {}', () => {
    const result = listhelper.mostLikes([{}])
    expect(result).toEqual({})
  })

  test('when list only has one blog, equals itself', () => {
    const result = listhelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has multiple blogs, returns the one with the most likes', () => {
    const result = listhelper.mostLikes(blogs)
    expect(result).toEqual(
      {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe('Most blogs', () => {

  test('when list is empty, author with most blogs is undefined', () => {
    const result = listhelper.mostBlogs([{}])
    expect(result).toEqual({author: undefined, blogs: 1})
  })

  test('when list only has one blog, equals itself the author and 1 blog', () => {
    const result = listhelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({author: "Edsger W. Dijkstra", blogs: 1})
  })

  test('when list has multiple blogs, author with most blogs is correctly found', () => {
    const result = listhelper.mostBlogs(blogs)
    expect(result).toEqual({author: "Robert C. Martin", blogs: 3})
  })
})