import mongoose from 'mongoose'

const { MONGODB_URI, DATABASE_NAME } = process.env

const connectDatabase = async () => {
    try {
        await mongoose.connect(`${MONGODB_URI}/${DATABASE_NAME}`)
        console.log('Connected to mongodb')
    } catch (error) {
        console.log('database configuration error: ' + error)
    }
}

export default connectDatabase
