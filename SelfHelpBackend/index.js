require("dotenv").config();
const http = require("http");
//const fs = require("fs");
//const https = require("https");
const express = require("express");
const app = express();
const sequelize = require("./db.js");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");
const UserController = require('./src/controller/UserControllers/index');
const TarifController = require('./src/controller/TarifController');
const UserItemCounts = require('./src/controller/UserItemCounts');
const UserStructure = require('./src/controller/UserStructure/index');
const CangeUserInfo =require('./src/controller/CangeUserInfo');
const multer = require("multer");

// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/kosmoss.host/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/kosmoss.host/cert.pem",
//   "utf8"
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/kosmoss.host/chain.pem",
//   "utf8"
// );
//
//
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };
//

app.use(cors());
const server = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);
app.use(express.json());
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './files/images');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });
app.post('/api/user/avatar_update',upload.array('avatar'), CangeUserInfo.avatar);

app.use("/api/user/avatars", express.static(path.resolve(__dirname, "files", "images")));
app.use("/api/user/inviter", UserController.inviter);
app.post("/api/user/registration", UserController.registration);
app.post("/api/user/registration_sms", UserController.sendSms);
app.post("/api/user/registration_sms/otp", UserController.veryfiOtp);
app.post("/api/user/login", UserController.login);
app.post('/api/user/pin_setup/pin', UserController.pinsetup);
app.post('/api/user/pin_verrif/pin', UserController.pinVeri);
app.post('/api/user/join_tarifs', UserController.joinTarif);
app.post('/api/user/info', CangeUserInfo.userInfo);
app.use('/api/matrix/type', TarifController.tarifs);
app.use('/api/user/item_counts', UserItemCounts.userItem);
app.use('/api/user/item_bonuses', UserItemCounts.userItemBonuses);
app.use('/api/user/user_structure', UserStructure.userStructure);
app.use('/api/user/user_structure_id', UserStructure.userStructureId);
//app.use('/api/matrix/type_map', TarifController.tarifMap);
app.use('/api/user', UserController.userInfo);
const start = async ()=>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(80, () => console.log(`server started on port 80`));
        //httpsServer.listen(443, () => console.log(`server started on port 443`));
    }catch (error){
        console.log(error)
    }
};
start();
