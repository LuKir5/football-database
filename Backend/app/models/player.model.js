module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      city: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.FLOAT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      position: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Player;
  };