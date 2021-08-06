const express = require("express")

const booksRouter = express.Router()
const {
  findAll,
  findOne,
  addOne,
  updateOne,
  delOne,
  updateOneByTitle,
} = require("./controller")

booksRouter.get("/", findAll)

booksRouter.get("/:id", findOne)

booksRouter.post("/", addOne)

booksRouter.patch("/:id", updateOne)

booksRouter.delete("/:id", delOne)

booksRouter.patch("/title/:title", updateOneByTitle)

module.exports = booksRouter
