if ('development' === process.env.NODE_ENV) {
    delete require.cache[require.resolve("./src/index.js")];
}
const service = require("./src/index.js");
module.exports = service;