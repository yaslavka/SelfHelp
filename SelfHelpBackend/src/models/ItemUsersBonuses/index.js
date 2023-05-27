const sequelize = require("../../../db");
const {UsersTable} = require("../UsersModel");
const {DataTypes} = require("sequelize");

const ItemUsersBonuses = sequelize.define('partner_bonuse', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    summ: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
    level: {type: DataTypes.INTEGER, defaultValue: null},
    userId: {type: DataTypes.BIGINT, defaultValue: null},
})
UsersTable.hasMany(ItemUsersBonuses, {as: 'partner_bonuse'});
ItemUsersBonuses.belongsTo(UsersTable, {as: "user"});
module.exports ={ItemUsersBonuses}
