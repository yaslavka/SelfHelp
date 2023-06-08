const {UsersTable} = require('../../models/UsersModel/index')
const {TypeMatrix} = require('../../models/TarifModel/index')
const jwt = require("jsonwebtoken");
const {Matrix_Table} = require("../../models/MatrixTableModel");


class TarifController {
    async tarifs(req,res){
        const { authorization } = req.headers;
        if (!authorization){
            return res.status(500).json({message: 'Вы не авторизованы'})
        }
        const token = authorization.slice(7);
        const {phone} = jwt.decode(token);
        const user = await UsersTable.findOne({where: {phone:phone}})
        const type = await Matrix_Table.findAll({
            where: { userId: user.id },
        });
        let typ_matrix = await TypeMatrix.findAll()
        let result = [];
        for (let i = 1; i < 4; i++) {
            const countItem = type.filter((j)=>{
                return j.typeMatrixId === i
            })
            result.push({
                id: i,
                count: countItem[0]?.dataValues?.count || 0,
                name: typ_matrix[i - 1].name,
                level: i,
                bonus: countItem[0]?.dataValues?.bonus || 0,
                budget: countItem[0]?.dataValues?.budget || 0,
                canBuy: i === 1 ? true : countItem[0]?.dataValues?.canBuy || false,
                isActive: countItem[0]?.dataValues?.isActive || false,
                summ: typ_matrix[i -1].summ,
            });
        }
        return res.status(200).json(result)
    }
    // async tarifMap(req, res){
    //     const { authorization } = req.headers;
    //     if (!authorization){
    //         return res.status(500).json({message: 'Вы не авторизованы'})
    //     }
    //     const token = authorization.slice(7);
    //     const {phone} = jwt.decode(token);
    //     const user = await UsersTable.findOne({where: {phone:phone}})
    //     let typ_matrix_1 = await TypeMatrix.findOne({where: {userId:user.id, name: 'START TRX-'}})
    //     let typ_matrix_2 = await TypeMatrix.findOne({where: {userId:user.id, name: 'INVEST TRX-'}})
    //     let typ_matrix_3 = await TypeMatrix.findOne({where: {userId:user.id, name: 'PROFI TRX-'}})
    //     return res.status(200).json({typ_matrix_1:typ_matrix_1, typ_matrix_2:typ_matrix_2, typ_matrix_3:typ_matrix_3})
    // }
}
module.exports = new TarifController()
