const {OtpModel}=require('../../models/OtpModel/index')
const bcrypt = require("bcrypt");
const {UsersTable} = require('../../models/UsersModel/index')
const jwt = require("jsonwebtoken");
const {TypeMatrix} = require("../../models/TarifModel");
const decode='random_key'
const TronWeb = require('tronweb');
const crypto = require('crypto');
const generateJwt = (id, email, last_name, inviter_id, phone) => {
    return jwt.sign({id:id, email: email, last_name: last_name, inviter_id: inviter_id, phone: phone},decode);
};

const accountSid = 'ACbdd2ffb58b0ea9272c0f75dbd1922b04';
const authToken = '586d5546a6e13e1e0a6714748ceedbfe';
//const accountSid = process.env.ACCOUNT_SID;
//const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
class UserController {
    async inviter(req, res) {
        const { username } = req.query;
        const user = await UsersTable.findOne({ where: { username:username } });
        if (!user) {
            return res.status(404).json({message: 'указанный вами наставни не был найден'})
        }
        let result = {
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
        };
        return res.json(result);
    }
    async registration(req, res){
        const {last_name, phone, email, password, inviter}=req.body
        if (!last_name){
            return res.status(404).json({message: 'поле имя обязательно к заполнению'})
        }
        if (!phone){
            return res.status(404).json({message: 'поле Телефон обязательно к заполнению'})
        }
        if (!email){
            return res.status(404).json({message: 'поле email обязательно к заполнению'})
        }
        if (!password){
            return res.status(404).json({message: 'поле Пароль обязательно к заполнению'})
        }
        const candidateEmail = await UsersTable.findOne({ where: { email:email } })
        const candidatephone = await UsersTable.findOne({ where: { phone:phone } })
        if (candidateEmail) {
            return res.status(404).json({message: 'Такой email уже существует'})
        }
        if (candidatephone){
            return res.status(404).json({message: 'Такой телефон уже существует'})
        }
        const inviterUser = await UsersTable.findOne({ where: { username: inviter } });
        if (!inviterUser) {
            return res.status(404).json({message: 'не верный логин пригласителя'})
        }
        const hashPassword = await bcrypt.hash(password, 5);
        await UsersTable.create({
            email: email,
            last_name: last_name,
            password: hashPassword,
            phone: phone,
            inviter_id: inviterUser.id,
        });
        const user =await UsersTable.findOne({where: {phone:phone}})
        await TypeMatrix.create({
            name: "START TRX-",
            summ: 150,
            canBuy: true,
            count: 0,
            isActive: false,
            userId:user.id

        })
        await TypeMatrix.create({
            name: "INVEST TRX-",
            summ: 1500,
            canBuy: false,
            count: 0,
            isActive: false,
            userId:user.id

        })
        await TypeMatrix.create({
            name: "PROFI TRX-",
            summ: 15000,
            canBuy: false,
            count: 0,
            isActive: false,
            userId:user.id

        })

    }
    async sendSms(req, res){
        const {phone, email}=req.body
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
      const user = await UsersTable.findOne({where: {email: email}})
        const hashPassword = await bcrypt.hash(otp, 5);
        const chek = await OtpModel.findOne({where:{userId: user.id}})
        if (!chek){
            await OtpModel.create({
                otp:hashPassword,
                userId: user.id
            })
        }else {
            let update = {otp: hashPassword}
            await OtpModel.update(update, {where: {userId: user.id}})
        }
      client.messages.create({
          body: `Тестовое сообщение подтверждения регистрации код ${otp}`,
          to: phone,
          from: '+13158478310'
        })
          .then(message =>{console.log(message)})
          .catch(error=>{console.log(error)})
        return res.status(200).json(true)
    }
    async veryfiOtp(req, res){
        const {otps, email}=req.body
        const user = await UsersTable.findOne({where: {email:email}})
        const code = await OtpModel.findOne({where: {userId: user.id}})
        let compareOtp = await bcrypt.compareSync(otps, code.otp);
        if (!compareOtp) {
            return res.status(500).json({message: 'Неверный код из смс'});
        }
        return res.status(200).json({otpVerify: true})
    }
    async login(req, res){
        const {phone, password}=req.body
        const user = await UsersTable.findOne({where: {phone:phone}})
        if (!user){
            return res.status(500).json({message: 'Не верный номер телефона'})
        }
        let comparePassword = await bcrypt.compareSync(password, user.password);
        if (!comparePassword){
            return res.status(500).json({message: 'Неверный пароль'})
        }
        const access_token = generateJwt(
            user.id,
            user.email,
            user.last_name,
            user.inviter_id,
            user.phone
        );
        return res.status(200).json({access_token})

    }
    async pinsetup(req,res){
        const { authorization } = req.headers;
        const {pin}=req.body
        if (!authorization){
            return res.status(500).json({message: 'Вы не авторизованы'})
        }
        const token = authorization.slice(7);
        const hashPin = await bcrypt.hash(pin, 5);
        try {
            let update ={pinCode: hashPin}
            const {phone} = jwt.decode(token);
            const user = await UsersTable.findOne({where: {phone:phone}})
            await UsersTable.update(update,{where:{id:user.id}})
            return res.status(200).json({pinVerify: true})
        }catch (error){
            console.log(error)
            return res.status(500).json({message: error})
        }

    }
    async joinTarif(req, res){
        const privateKey = crypto.randomBytes(32).toString('hex');
        //console.log("Private Key", privateKey);

        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider("https://api.trongrid.io");
        const solidityNode = new HttpProvider("https://api.trongrid.io");
        const eventServer = new HttpProvider("https://api.trongrid.io");
        const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

        const wallet = await tronWeb.createAccount();
        const balance= await tronWeb.trx.getBalance(wallet.base58)
        console.log(balance);
        return res.json(true)
    }
    async userInfo(req, res){
        const { authorization } = req.headers;
        if (!authorization){
            return res.status(500).json({message: 'Вы не авторизованы'})
        }
        const token = authorization.slice(7);
        try {
            const {phone} = jwt.decode(token);
            let user = await UsersTable.findOne({where: {phone:phone}, include: 'inviter'})
            return res.status(200).json(user)
        }catch (error){
            console.log(error)
        }
    }
}
module.exports = new UserController();
