import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/sequalize.js';
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  password: string;
  photo: string | null;
  last_active_at: Date | null;
  auth_type_id: number;
}

interface UserCreationAttributes
  extends Omit<UserAttributes, 'id'> {}
  const User = sequelize.define<
  Model<UserAttributes, UserCreationAttributes>
>('User', {
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