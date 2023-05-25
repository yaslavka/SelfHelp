const {Sequelize} = require('sequelize')

module.exports = new Sequelize(   
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        dialectOptions: 50000,
        pool: {
            max: 20,
            min: 0,
            acquire: 60000,
            idle: 10000
          }
        // port: process.env.DB_PORT
    }
) 