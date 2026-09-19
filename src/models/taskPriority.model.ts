import { DataTypes } from "sequelize";
import sequelize from "../configs/sequalize.js";

const Priority = sequelize.define('priority',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
},{
    tableName: 'prioritys',
    timestamps: true,
    createdAt: 'created_at'
})

export default Priority;