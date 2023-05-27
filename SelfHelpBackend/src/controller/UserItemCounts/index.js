const {UsersTable} = require('../../models/UsersModel/index')
const jwt = require("jsonwebtoken");
const {ItemUsersBonuses} = require("../../models/ItemUsersBonuses");
class UserItemCounts {
    async userItem(req, res){
        const { authorization } = req.headers;
        if (!authorization){
            return res.status(500).json({message: 'Вы не авторизованы'})
        }
        const token = authorization.slice(7);
        const {phone} = jwt.decode(token);
        const user = await UsersTable.findOne({where: {phone:phone}})
        const item_1 = await UsersTable.findAll({where:{inviter_id: user.id}})
        const item_2 = await UsersTable.findAll({where: {inviter_id: item_1.map(i=>i.id)}})
        const item_3 = await UsersTable.findAll({where: {inviter_id: item_2.map(i=>i.id)}})
        const all_item = item_1.length+item_2.length+item_3.length
        return res.status(200).json({item_1:item_1.length, item_2:item_2.length, item_3:item_3.length,all_item:all_item})

    }
    async userItemBonuses(req, res){
        const { authorization } = req.headers;
        if (!authorization){
            return res.status(500).json({message: 'Вы не авторизованы'})
        }
        const token = authorization.slice(7);
        const {phone} = jwt.decode(token);
        const user = await UsersTable.findOne({where: {phone:phone}})
        const item_bonuses_1 = await ItemUsersBonuses.sum("summ",{where:{level: 1, userId:user.id}})
        const item_bonuses_2 = await ItemUsersBonuses.sum("summ",{where:{level: 2, userId:user.id}})
        const item_bonuses_3 = await ItemUsersBonuses.sum("summ",{where:{level: 3, userId:user.id}})
        const all_bonuses_item = item_bonuses_1+item_bonuses_2+item_bonuses_3
        return res.status(200).json({item_1:item_bonuses_1, item_2:item_bonuses_2, item_3:item_bonuses_3,all_item:all_bonuses_item})

    }
}
module.exports = new UserItemCounts()
