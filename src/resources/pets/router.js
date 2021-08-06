const express = require("express")
const petsRouter = express.Router()
const {
  findAll,
  findOne,
  addOne,
  updateOne,
  deleteOne,
} = require("./controller")

petsRouter.get("/", findAll)

petsRouter.get("/:id", findOne)

petsRouter.post("/", addOne)

petsRouter.patch("/:id", updateOne)

petsRouter.delete("/:id", deleteOne)

module.exports = petsRouter
