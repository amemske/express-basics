const moment = require('moment');
// create a middleware to log the url
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
    next();
};

module.exports = logger;