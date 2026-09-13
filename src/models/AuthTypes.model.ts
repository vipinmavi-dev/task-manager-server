import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequalize.js';


const AuthType = sequelize.define(
  'AuthType',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'auth_types',
    timestamps: false,
  }
);

export default AuthType;