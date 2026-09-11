import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequalize.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true,
  }, 
  password: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  last_active_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  auth_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'auth_types',
        key: 'id',  
    }
  },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default User;