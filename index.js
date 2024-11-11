require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const { swaggerSpec, swaggerUi } = require('./swagger');

const app = express()
const PORT = process.env.PORT || 5000

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors())
app.use(express.json())
app.use('/', router)


const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => console.log(`started on ${PORT} port`))
    }catch(e){
        console.log(e)
    }
}

start()
