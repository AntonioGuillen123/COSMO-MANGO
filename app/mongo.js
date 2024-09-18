import mongoose from 'mongoose'

export const createConnection = async () => {
    const connectionString = process.env.CONNECTIONSTRING
    
    await mongoose.connect(connectionString)
        .then(() => console.log('Database Connected'))
        .catch((err) => console.log(err))
}