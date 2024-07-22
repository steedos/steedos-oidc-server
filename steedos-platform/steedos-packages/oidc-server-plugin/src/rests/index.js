
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(__dirname);
const codes = files.filter(file => file !== 'index.js').reduce(
    function (codes, file) {
        if ('development' === process.env.NODE_ENV) {
            delete require.cache[require.resolve(`./${file}`)];
        }
        return {
            ...codes,
            [path.parse(file).name]: require(`./${file}`),
        }
    },
    {}
);
module.exports = codes