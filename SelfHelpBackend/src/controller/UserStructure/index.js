const {UsersTable} = require('../../models/UsersModel/index')
const jwt = require("jsonwebtoken");
const {TypeMatrix} = require("../../models/TarifModel");
class UserStructure {
    async userStructure(req, res){
        const { authorization } = req.headers;
        if (!authorization){
            return res.status(500).json({message: 'Вы не авторизованы'})
        }
        const token = authorization.slice(7);
        const {phone} = jwt.decode(token);
        const user = await UsersTable.findOne({where: {phone:phone}})
        const structure_level_1 =await UsersTable.findAll({where: {inviter_id: user.id}})
        const structure_level_2 =await UsersTable.findAll({where: {inviter_id: structure_level_1.map(i=>i.id)}})
        const structure_level_3 =await UsersTable.findAll({where: {inviter_id: structure_level_2.map(i=>i.id)}})
       return res.status(200).json({item_1:structure_level_1, item_2: structure_level_2, item_3:structure_level_3})
    }
    async userStructureId(req, res){
        const {id}=req.query
        const user = await UsersTable.findOne({where: {id:id}, include:[{model:TypeMatrix, as: 'type_matrix'},{model:UsersTable, as:'inviter'}]})
        console.log(user)
        return res.status(200).json(user)
    }
}
module.exports = new UserStructure()
