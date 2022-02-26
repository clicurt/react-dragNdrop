/** @ignore */
const http = require('http')
/** @ignore */
const app = require('./app')

/** 
 * use environment settings when available
 * @ignore 
 */
const port = process.env.PORT || 9009;

/** @ignore */
const server = http.createServer(app)

server.listen(port, () => console.log(`listening on port ${port}`));