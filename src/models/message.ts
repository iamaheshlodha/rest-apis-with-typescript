import { Model, DataTypes, Sequelize } from 'sequelize'
import { sequelize } from './database'
import User from './user';

class Message extends Model {
    public id!: string;
    public room!: string;
    public messages!: Object

    public user?: User;

    public created_at!: Date;
    public updated_at!: Date;
}

Message.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    room: {
        type: DataTypes.STRING
    },
    messages: {
        type: DataTypes.JSONB
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
},
    {
        sequelize,
        tableName: "messages",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    })

export default Message