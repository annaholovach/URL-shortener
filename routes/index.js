const Router = require('express')
const router = new Router()
const urlController = require('../controllers/urlController')


router.get('/health', (req, res) => {
  res.status(200).send('Server is up and running!');
});

router.get('/check', (req, res) => {
  res.status(200).send('Server is up and running!');
});

/**
 * @swagger
 * /url/shorten:
 *   post:
 *     summary: Створення короткої версії URL
 *     description: Дозволяє скоротити довгий URL і повертає короткий.
 *     operationId: createUrl
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 description: Оригінальний довгий URL
 *                 example: "https://www.example.com"
 *     responses:
 *       '200':
 *         description: Успішне скорочення URL
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "https://short.url/abc123"
 *       '500':
 *         description: Внутрішня помилка сервера
 */
router.post('/url/shorten', urlController.createUrl)

/**
 * @swagger
 * /{urlCode}:
 *   get:
 *     summary: Отримання оригінального URL за скороченим кодом
 *     description: Дозволяє отримати оригінальний URL за його коротким кодом.
 *     operationId: getUrl
 *     parameters:
 *       - in: path
 *         name: urlCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Код скороченого URL
 *         example: "https://short.url/abc123"
 *     responses:
 *       '200':
 *          description: Успішне перенаправлення на оригінальний URL
 *       '404':
 *         description: Короткий URL не знайдений
 */
router.get('/:urlCode', urlController.getUrl)

module.exports = router