const db = require("../models");
const Player = db.players;
const Op = db.Sequelize.Op;

// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Player
  const player = {
    name: req.body.name,
    age: req.body.age,
    birthdate: req.body.birthdate,
    city: req.body.city,
    height: req.body.height,
    weight: req.body.weight,
    position: req.body.position,
    published: req.body.published ? req.body.published : false
  };

  // Save Player in the database
  Player.create(player)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Player.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving players."
        });
      });
};

// Find a single Player with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Player.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Player with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Player with id=" + id
        });
      });
};

// Update a Player by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Player.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Player was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Player with id=${id}. Maybe Player was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Player with id=" + id
        });
      });
};

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Player.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Player was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Player with id=${id}. Maybe Player was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Player with id=" + id
        });
      });
};

// Delete all Players from the database.
exports.deleteAll = (req, res) => {
      Player.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Players were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all players."
          });
        });
};

// Find all published Players
exports.findAllPublished = (req, res) => {
    Player.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    });
};
