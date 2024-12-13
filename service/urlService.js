const Url = require('../models/urlModel')
const shortId = require('shortid')
const validUrl = require('valid-url')
const {isUrlValid} = require('../utils/urlValidator')
const {SET_ASYNC, GET_ASYNC} = require('../caching/cache')
const logger = require('../logger/logger')

class UrlService {
    async createUrl (longUrl) {
        if (!longUrl || !isUrlValid(longUrl) || !validUrl.isUri(longUrl)) {
            throw new Error('enter a valid url')
        }
        logger.info(`Creating URL for: ${longUrl}`)

        const cachedShortUrl = await GET_ASYNC(longUrl);
        if (cachedShortUrl) {
            return cachedShortUrl;
        }

        const existingUrl = await Url.findOne({ where: { longUrl } });
        if (existingUrl) {
            await SET_ASYNC(longUrl, existingUrl.shortUrl)
            return existingUrl.shortUrl
        }

        const urlCode = shortId.generate().toLowerCase()
        const shortUrl = process.env.BASE_URL + urlCode

        const saveData = {
            urlCode: urlCode,
            longUrl: longUrl,
            shortUrl: shortUrl
        }
        const newUrl = await Url.create(saveData)
        return newUrl.shortUrl
    }

    async getUrl (urlCode) {
        logger.info(`Fetching URL for code: ${urlCode}`)
        const cachedLongUrl = await GET_ASYNC(urlCode);
        if (cachedLongUrl) {
            return cachedLongUrl;
        }

        const existUrl = await Url.findOne({where: {urlCode: urlCode}})
        if (!existUrl) {
            throw new Error ('such url does not exist')
        }

        await SET_ASYNC(urlCode, existUrl.dataValues.longUrl)

        return existUrl.dataValues.longUrl
    }
}

module.exports = new UrlService()