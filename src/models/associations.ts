import User from './Users.model.js';
import AuthType from './AuthTypes.model.js';

User.belongsTo(AuthType, {
  foreignKey: 'auth_type_id',
});

AuthType.hasMany(User, {
  foreignKey: 'auth_type_id',
});

export { User, AuthType };