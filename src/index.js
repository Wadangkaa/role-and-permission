import dotenv from 'dotenv'
import connectDatabase from './database/config.js'
import app from './app.js'

dotenv.config()

connectDatabase()
    .then(function () {
        console.log('Database connected')

        const port = process.env.PORT
        app.listen(port, () => {
            console.log('server listening on port: ' + port)
        })
    })
    .catch(function (error) {
        console.error('database connection error in index.js', error)
    })
