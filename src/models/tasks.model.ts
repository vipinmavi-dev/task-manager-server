import { DataTypes } from "sequelize";
import sequelize from "../configs/sequalize.js";

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descriptin: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'statuses',
            key: 'id',  
        }
    },
    priority_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'prioritys',
            key: 'id',  
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',  
        }
    }
},{
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at'
})

export default Task;