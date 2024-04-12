module.exports = (sequelize,DataTypes)=>{

    const WorkInfo = sequelize.define("workinfo",{
        id:{
            type:DataTypes.STRING,
            allowNull:true,
            primaryKey:true
        },
        machine_id:{
            type:DataTypes.STRING,
        },
        date:{
             type: DataTypes.STRING,
        },
        start_time:{
            type: DataTypes.STRING,
        },
        end_time:{
            type: DataTypes.STRING,
        },
        operating_time:{
            type: DataTypes.INTEGER,
        },
        break_down_time:{
            type: DataTypes.INTEGER,
        },
        shut_down_time:{
            type: DataTypes.INTEGER,
        },
        products_count:{
            type: DataTypes.INTEGER,
        },
        scrap_count:{
            type: DataTypes.INTEGER,
        },
        down_time_reasons:{
            type: DataTypes.STRING,
        }
    })
    return WorkInfo;
}