const dbConfig = require('../config/dbConfig');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        port:3305,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

sequelize.authenticate()
 .then(()=>{
    console.log("db connected");
 })
 .catch(err=>{
    console.log('Error'+err);
 })

const db={};


db.Sequelize = Sequelize
db.sequelize = sequelize

db.company = require('./companyModel')(sequelize, DataTypes);
db.machine = require('./machineModel')(sequelize, DataTypes);
db.workInfo = require('./wordInfoModel')(sequelize, DataTypes);


db.sequelize.sync({force: false})
.then(() => {
    console.log("Yes re-sync Done");
})


module.exports = db;