require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const sequelize = require("./db.js");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");
const UserController = require('./src/controller/UserControllers/index')
const TarifController = require('./src/controller/TarifController')
const UserItemCounts = require('./src/controller/UserItemCounts')
const UserStructure = require('./src/controller/UserStructure/index')

app.use(cors());
const server = http.createServer(app);
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/user/avatars", express.static(path.resolve(__dirname, "files", "images")));
app.use("/api/user/inviter", UserController.inviter)
app.post("/api/user/registration", UserController.registration)
app.post("/api/user/registration_sms", UserController.sendSms)
app.post("/api/user/registration_sms/otp", UserController.veryfiOtp)
app.post("/api/user/login", UserController.login)
app.post('/api/user/pin_setup/pin', UserController.pinsetup)
app.post('/api/user/join_tarifs', UserController.joinTarif)
app.use('/api/matrix/type', TarifController.tarifs)
app.use('/api/user/item_counts', UserItemCounts.userItem)
app.use('/api/user/item_bonuses', UserItemCounts.userItemBonuses)
app.use('/api/user/user_structure', UserStructure.userStructure)
app.use('/api/user/user_structure_id', UserStructure.userStructureId)
app.use('/api/matrix/type_map', TarifController.tarifMap)
app.use('/api/user', UserController.userInfo)
const start = async ()=>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(80, () => console.log(`server started on port 80`));
    }catch (error){
        console.log(error)
    }
}
start();
