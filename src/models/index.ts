import User from "./user";
import Message from "./message";

User.hasMany(Message, {foreignKey: 'user_id', as: 'messages'})
Message.belongsTo(User, {foreignKey: 'message_id', as: 'user'})

export {User, Message}