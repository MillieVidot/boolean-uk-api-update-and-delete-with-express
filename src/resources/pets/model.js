const db = require("../../utils/database")
const { buildAnimalDatabase } = require("../../utils/mockData")

function Pet() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS pets;
    

      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `

    db.query(sql)
      .then(result => console.log("[DB] Pet table ready."))
      .catch(console.error)
  }

  function mockData() {
    const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
    `

    const pets = buildAnimalDatabase()

    pets.forEach(pet => {
      db.query(createPet, Object.values(pet)).catch(console.error)
    })
  }

  function findAllPets(callback) {
    const sql = `
    SELECT * FROM pets
    `
    db.query(sql)
      .then(result => callback(result.rows))
      .catch(console.error)
  }

  function findOnePet(id, callback) {
    const sql = `
    SELECT * FROM pets
    WHERE id = ($1)
    `
    db.query(sql, [id])
      .then(result => callback(result.rows[0]))
      .catch(console.error)
  }

  function addPet(petToAdd, callback) {
    const { name, age, type, breed, microchip } = petToAdd
    const sql = `
    INSERT INTO pets
    (name, age, type, breed, microchip)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `
    db.query(sql, [name, age, type, breed, microchip])
      .then(newPet => callback(newPet.rows[0]))
      .catch(console.error)
  }

  function patchPetById(id, updatedPet, callback) {
    const { name, age, type, breed, microchip } = updatedPet

    const sql = `
    UPDATE pets
    SET name = $1,
    age = $2,
    type = $3,
    breed = $4,
    microchip = $5
    WHERE id = $6
    RETURNING *
    `
    db.query(sql, [name, age, type, breed, microchip, id])
      .then(updatedPet => callback(updatedPet.rows[0]))
      .catch(console.error)
  }

  function delOnePet(id, callback) {
    const sql = `
    DELETE FROM pets
    WHERE id = ($1)`

    db.query(sql, [id])
      .then(result => callback(result.rows[0]))
      .catch(console.error)
  }
  createTable()
  mockData()

  return { findAllPets, findOnePet, addPet, patchPetById, delOnePet }
}

module.exports = Pet
