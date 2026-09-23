import User from './Users.model.js';
import AuthType from './AuthTypes.model.js';
import Task from './tasks.model.js';
import TaskStatus from './taskStatus.model.js';
import TaskPriority from './taskPriority.model.js';

User.belongsTo(AuthType, {
  foreignKey: 'auth_type_id',
});

AuthType.hasMany(User, {
  foreignKey: 'auth_type_id',
});

Task.belongsTo(TaskStatus, {
  foreignKey: 'status_id',
  as: 'status'
});

Task.belongsTo(TaskPriority, {
  foreignKey: 'priority_id',
  as: 'priority'
});
export { User, AuthType };