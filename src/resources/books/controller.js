const Book = require("./model")
const {
  getAllBooks,
  getBookById,
  addBook,
  patchBookById,
  delOneBook,
  getBookByTitle,
  patchBookByTitle,
} = Book()

function findAll(req, res) {
  getAllBooks(result => res.json({ result }))
}

function findOne(req, res) {
  const id = req.params.id
  getBookById(id, result => res.json({ result }))
}

function addOne(req, res) {
  const bookToAdd = { ...req.body }
  addBook(bookToAdd, result => res.json({ result }))
}

function updateOne(req, res) {
  const id = req.params.id
  const newData = { ...req.body }
  getBookById(id, origBook => {
    const bookToUpdate = { ...origBook, ...newData }
    patchBookById(id, bookToUpdate, updatedBook => res.json({ updatedBook }))
  })
}

function delOne(req, res) {
  const id = req.params.id
  delOneBook(id, result =>
    res.json({ msg: `Book with and ID of ${id} has been deleted` })
  )
}

function updateOneByTitle(req, res) {
  const title = req.params.title
  const newData = { ...req.body }
  getBookByTitle(title, origBook => {
    const bookToUpdate = { ...origBook, ...newData }
    patchBookByTitle(title, bookToUpdate, updatedBook =>
      res.json({ updatedBook })
    )
  })
}

module.exports = {
  findAll,
  findOne,
  addOne,
  updateOne,
  delOne,
  updateOneByTitle,
}
