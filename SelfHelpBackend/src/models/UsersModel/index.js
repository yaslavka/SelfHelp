const sequelize = require("../../../db");
const {DataTypes} = require("sequelize");
const UsersTable = sequelize.define("user", {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11,},
    inviter_id: {type: DataTypes.BIGINT, defaultValue: null},
    activation_date: {type: DataTypes.DATE, defaultValue: null},
    active_partners: {type: DataTypes.INTEGER, defaultValue: 0},
    avatar: {type: DataTypes.STRING, defaultValue: null},
    balance: {type: DataTypes.DECIMAL(61, 8), defaultValue: 0.00000000, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    pinCode: {type: DataTypes.STRING, defaultValue: null},
    first_name: {type: DataTypes.STRING, defaultValue: null},
    last_name: {type: DataTypes.STRING, defaultValue: null},
    trx: {type: DataTypes.DECIMAL(61, 8), defaultValue: 0.00000000, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    registration_date: {type: DataTypes.DATE, defaultValue: null},
    username: {type: DataTypes.STRING, defaultValue: null},
    start: {type: DataTypes.BOOLEAN, defaultValue: true},
    invest: {type: DataTypes.BOOLEAN, defaultValue: false},
    pro: {type: DataTypes.BOOLEAN, defaultValue: false},
    isAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
})
UsersTable.belongsTo(UsersTable, {foreignKey: 'inviter_id', as: 'inviter'})
module.exports = {UsersTable}
