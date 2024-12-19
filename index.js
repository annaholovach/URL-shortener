require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const { swaggerSpec, swaggerUi } = require('./swagger');
const logger = require('./logger/logger');

const app = express()
const PORT = process.env.PORT || 5000

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (req, res) => {
  res.status(200).send('Server is up and running!');
});

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`Request handled`, {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
        });
    });
    next();
});

app.use('/', router)

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        console.log('Connection has been established successfully.');
        logger.info('Connection has been established successfully.')
        app.listen(PORT, () => logger.info(`Application started on ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()
