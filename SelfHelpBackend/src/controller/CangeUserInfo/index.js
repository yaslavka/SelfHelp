const {UsersTable} = require("../../models/UsersModel/index");
const jwt = require("jsonwebtoken");

class CangeUserInfo {
    async avatar(req, res) {
        const { authorization } = req.headers;
        if(!authorization){
            return res.json('Ненайден айди пользователя');
        }
        const token = authorization.slice(7);
        const decodeToken = jwt.decode(token);
        const user = await UsersTable.findOne({
            where: { email: decodeToken.email },
        });
        let fileName = req.files[0].filename;
        let update = { avatar: fileName };
        await UsersTable.update(update, { where: { id: user.id } });
        return res.json("Аватар успешно загружен");
    }
    async userInfo(req,res){
        console.log(req.body)
        const { authorization } = req.headers;
        if(!authorization){
            return res.json('Ненайден айди пользователя');
        }
        const {last_name, phone, emails, username}=req.body
        const token = authorization.slice(7);
        const decodeToken = jwt.decode(token);
        const user = await UsersTable.findOne({
            where: { phone: decodeToken.phone },
        });
        let update = { last_name:last_name, phone:phone, email:emails, username:username };
        await UsersTable.update(update, { where: { id: user.id } });
        return res.json(true);
    }
}
module.exports = new CangeUserInfo()
