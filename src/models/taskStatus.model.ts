import { DataTypes } from "sequelize";
import sequelize from "../configs/sequalize.js";

const Status = sequelize.define('status',{
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
    tableName: 'statuses',
    timestamps: false,
})

export default Status;