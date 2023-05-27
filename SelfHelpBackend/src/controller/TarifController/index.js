const {UsersTable} = require('../../models/UsersModel/index')
const {TypeMatrix} = require('../../models/TarifModel/index')
const jwt = require("jsonwebtoken");


class TarifController {
    async tarifs(req,res){
        const { authorization } = req.headers;
        if (!authorization){
            return res.status(500).json({message: 'Вы не авторизованы'})
        }
        const token = authorization.slice(7);
        const {phone} = jwt.decode(token);
        const user = await UsersTable.findOne({where: {phone:phone}})
        let typ_matrix = await TypeMatrix.findAll({where: {userId:user.id}})
        return res.status(200).json(typ_matrix)
    }
    async tarifMap(req, res){
        const { authorization } = req.headers;
        if (!authorization){
            return res.status(500).json({message: 'Вы не авторизованы'})
        }
        const token = authorization.slice(7);
        const {phone} = jwt.decode(token);
        const user = await UsersTable.findOne({where: {phone:phone}})
        let typ_matrix_1 = await TypeMatrix.findOne({where: {userId:user.id, name: 'START TRX-'}})
        let typ_matrix_2 = await TypeMatrix.findOne({where: {userId:user.id, name: 'INVEST TRX-'}})
        let typ_matrix_3 = await TypeMatrix.findOne({where: {userId:user.id, name: 'PROFI TRX-'}})
        return res.status(200).json({typ_matrix_1:typ_matrix_1, typ_matrix_2:typ_matrix_2, typ_matrix_3:typ_matrix_3})
    }
}
module.exports = new TarifController()
