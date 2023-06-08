const sequelize = require("../../../db");
const {TypeMatrix} = require("../TarifModel");
const {UsersTable} = require("../UsersModel");
const {DataTypes} = require("sequelize");

const Matrix_Table = sequelize.define(
    "matrix_table",
    {
            id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
            is_active: {type: DataTypes.BOOLEAN, defaultValue: null},
            can_buy: {type: DataTypes.BOOLEAN, defaultValue: null},
            count: {type: DataTypes.INTEGER, defaultValue: null},
            userId: {type: DataTypes.BIGINT, defaultValue: null},
            typeMatrixId: {type: DataTypes.BIGINT, defaultValue: null}
    }
);
TypeMatrix.hasMany(Matrix_Table, {as: 'type_matrix'});
Matrix_Table.belongsTo(TypeMatrix, {as: 'matrix_table'});
UsersTable.hasMany(Matrix_Table, {as: 'matrix_table'});
Matrix_Table.belongsTo(UsersTable, {as: "user"});
module.exports = {Matrix_Table}
