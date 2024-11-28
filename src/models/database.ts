import { Sequelize } from "sequelize"

export const sequelize = new Sequelize('postgres', 'postgres.iodgfxiojrhawbgyktnk', 'Naisarai@000', {
    host: 'aws-0-ap-south-1.pooler.supabase.com',
    dialect: 'postgres'
})

// sequelize.sync({alter: true}).then((data) => {
//     console.log('Database connected successfully');
// })