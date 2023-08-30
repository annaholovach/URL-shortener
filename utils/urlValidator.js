const isUrlValid = (longUrl) => {
    const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/.test(longUrl)
    return regex
}

module.exports = {isUrlValid}