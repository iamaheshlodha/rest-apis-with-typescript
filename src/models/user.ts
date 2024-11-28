import { Model, DataTypes, Sequelize } from 'sequelize'
import { sequelize } from './database'
import Message from './message';

class User extends Model {
    public id!: string;
    public username!: string;
    public password!: string;
    public readonly messages?: Message[]
    public created_at!: Date;
    public updated_at!: Date;
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},
    {
        sequelize,
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    })

export default User