const db = require("../../utils/database")
const { buildBooksDatabase } = require("../../utils/mockData")

function Book() {
  function createTable() {
    const sql = `    
    
    DROP TABLE IF EXISTS books;
      CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL
      );
    `

    db.query(sql)
      .then(result => console.log("[DB] Book table ready."))
      .catch(console.error)
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `

    const books = buildBooksDatabase()

    books.forEach(book => {
      db.query(createBook, Object.values(book)).catch(console.error)
    })
  }

  function getAllBooks(callbackFunction) {
    const sql = `
    SELECT * FROM books
    `
    db.query(sql)
      .then(result => callbackFunction(result.rows))
      .catch(console.error)
  }

  function getBookById(id, callbackFunction) {
    const sql = `
    SELECT * FROM books
    WHERE id = ($1);
    `
    db.query(sql, [id])
      .then(result => callbackFunction(result.rows[0]))
      .catch(console.error)
  }

  function addBook(bookToAdd, callbackFunction) {
    const sql = `
    INSERT INTO books
    (title, type, author, topic, publicationdate)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `
    db.query(sql, [
      bookToAdd.title,
      bookToAdd.type,
      bookToAdd.author,
      bookToAdd.topic,
      bookToAdd.publicationdate,
    ])
      .then(result => callbackFunction(result.rows[0]))
      .catch(console.error)
  }

  function patchBookById(id, bookToUpdate, callback) {
    const { title, type, author, topic, publicationdate } = bookToUpdate
    const sql = `
    UPDATE books
    SET title = $1, type = $2, author = $3, topic = $4, publicationdate = $5
    WHERE id = $6
    RETURNING *;

    `
    db.query(sql, [title, type, author, topic, publicationdate, id])
      .then(updatedBook => callback(updatedBook.rows[0]))
      .catch(console.error)
  }

  function delOneBook(id, callback) {
    const sql = `
    DELETE FROM books
    WHERE id = ($1)`

    db.query(sql, [id])
      .then(result => callback(result.rows[0]))
      .catch(console.error)
  }

  function getBookByTitle(title, callback) {
    const sql = `
    SELECT * FROM BOOKS
    WHERE title LIKE $1
    `
    db.query(sql, [title])
      .then(result => callback(result.rows[0]))
      .catch(console.error)
  }

  function patchBookByTitle(title, bookToUpdate, callback) {
    const { type, author, topic, publicationdate } = bookToUpdate
    const sql = `
  UPDATE books
  SET type = $1, author = $2, topic = $3, publicationdate = $4
  WHERE title LIKE $5
  RETURNING *;
  `
    db.query(sql, [type, author, topic, publicationdate, title]).then(
      updatedBook => callback(updatedBook.rows[0]).catch(console.error)
    )
  }

  createTable()
  mockData()
  return {
    getAllBooks,
    getBookById,
    addBook,
    patchBookById,
    delOneBook,
    getBookByTitle,
    patchBookByTitle,
  }
}

module.exports = Book
