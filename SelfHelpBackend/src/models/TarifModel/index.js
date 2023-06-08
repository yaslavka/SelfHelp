const sequelize = require("../../../db");
const {DataTypes} = require("sequelize");

const TypeMatrix = sequelize.define("type_matrix", {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: null},
    summ: {type: DataTypes.INTEGER, allowNull: false},
    canBuy: {type: DataTypes.BOOLEAN, defaultValue: true},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
    bonus: {type: DataTypes.DECIMAL(61, 8), defaultValue: 0.00000000, allowNull: false},
    budget: {type: DataTypes.DECIMAL(61, 8), defaultValue: 0.00000000, allowNull: false},
    isActive: {type: DataTypes.BOOLEAN, defaultValue: true},
});
module.exports = {TypeMatrix}
