module.exports = (sequelize,DataTypes)=>{

    const Company = sequelize.define("company",{
        id:{
            type:DataTypes.STRING,
            allowNull:true,
            primaryKey:true
        },
        name:{
             type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
        },
        image:{
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.STRING,
        },
        address:{
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING,
        }
    })
    return Company;
}