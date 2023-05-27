const sequelize = require("../../../db");
const {Matrix_Table} = require("../MatrixTableModel");
const {UsersTable} = require("../UsersModel");
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
    userId: {type: DataTypes.BIGINT, defaultValue: null},
});
Matrix_Table.hasMany(TypeMatrix, {as: 'type_matrix'});
TypeMatrix.belongsTo(Matrix_Table, {as: 'matrix_table'});
UsersTable.hasMany(TypeMatrix, {as: 'type_matrix'});
TypeMatrix.belongsTo(UsersTable, {as: "user"});
module.exports = {TypeMatrix}
