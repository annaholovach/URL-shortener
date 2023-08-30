const Router = require('express')
const router = new Router()
const urlController = require('../controllers/urlController')

router.post('/url/shorten', urlController.createUrl)
router.get('/:urlCode', urlController.getUrl)

module.exports = router