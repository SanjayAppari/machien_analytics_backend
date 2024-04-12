module.exports = (sequelize,DataTypes)=>{

    const Machine = sequelize.define("machine",{
        id:{
            type:DataTypes.STRING,
            allowNull:true,
            primaryKey:true
        },
        name:{
             type: DataTypes.STRING,
        },
        logid:{
            type: DataTypes.INTEGER,
        },
        image:{
            type: DataTypes.STRING,
        },
        type:{
            type: DataTypes.STRING,
        },
        company_id:{
            type: DataTypes.STRING,
        }
    })
    return Machine;
}