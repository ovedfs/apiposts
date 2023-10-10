const {Sequelize} = require('sequelize')

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './database/db.sqlite'
});

(async() => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})()

module.exports = connection