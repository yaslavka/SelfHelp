const sequelize = require("../../../db");
const {UsersTable} = require("../UsersModel");
const {DataTypes} = require("sequelize");

const OtpModel = sequelize.define('otpSignUp',{
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11,},
    otp: {type: DataTypes.STRING, defaultValue: null},
    userId: {type: DataTypes.BIGINT, defaultValue: null},
})

UsersTable.hasMany(OtpModel, {as: "otp"});
OtpModel.belongsTo(UsersTable, {as: 'otps'});

module.exports = {OtpModel}
