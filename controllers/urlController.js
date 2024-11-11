const urlService = require('../service/urlService')

class UrlController {
    async createUrl (req, res, next) {
        try {
            const {longUrl} = req.body
            const url = await urlService.createUrl(longUrl)
            return res.status(200).json(url)
        } catch(e) {
            return res.status(500).json(e.message)
        }
    }

    async getUrl (req, res, next) {
        try {
            const { urlCode } = req.params
            const url = await urlService.getUrl(urlCode)
            return res.redirect(url)
        }catch(e) {
            return res.status(404).json(e.message)
        }
    }
}

module.exports = new UrlController()