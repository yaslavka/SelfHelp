const sequelize = require("../../../db");
const {Matrix_Table} = require("../MatrixTableModel");
const {UsersTable} = require("../UsersModel");
const {DataTypes} = require("sequelize");

const Matrix = sequelize.define(
    "matrix",
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        date: {type: DataTypes.DATE, defaultValue: null},
        matrix_essence: {type: DataTypes.INTEGER, defaultValue: null},
        side_matrix: {type: DataTypes.INTEGER, defaultValue: null},
        parent_id: {type: DataTypes.BIGINT, defaultValue: null},
        userId: {type: DataTypes.BIGINT, defaultValue: null}
    }
);
Matrix.hasMany(Matrix_Table, {as: 'matrix_table'}, {
    foreignKey: {name: 'matrix_parent_id',}
});
Matrix.hasOne(Matrix, {
    foreignKey: 'parent_id'
});
UsersTable.hasMany(Matrix, {as: 'matrix'});
Matrix.belongsTo(UsersTable, {as: "user"});
module.exports ={Matrix}
