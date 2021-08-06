const Pet = require("./model")
const { findAllPets, findOnePet, addPet, patchPetById, delOnePet } = Pet()

function findAll(req, res) {
  findAllPets(result => res.json({ result }))
}

function findOne(req, res) {
  const id = req.params.id
  findOnePet(id, result => res.json({ result }))
}

function addOne(req, res) {
  const petToAdd = { ...req.body }

  addPet(petToAdd, result => res.json({ result }))
}

function updateOne(req, res) {
  const id = req.params.id
  const newData = { ...req.body }
  findOnePet(id, petToUpdate => {
    const updatedPet = { ...petToUpdate, ...newData }
    patchPetById(id, updatedPet, result => res.json({ result }))
  })
}

function deleteOne(req, res) {
  const id = req.params.id

  findOnePet(id, petToDel => {
    delOnePet(id, result =>
      res.json({ msg: `Pet with and ID of ${id} has been deleted` })
    )
  })
}

module.exports = { findAll, findOne, addOne, updateOne, deleteOne }
