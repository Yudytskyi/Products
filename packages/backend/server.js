const http = require('http');
const app = require('./app');
const { NODE_ENV = 'development' } = process.env;

const {
  [NODE_ENV]: { defaultPORT },
} = require('./configs/config.json');

const port = process.env.port ?? defaultPORT;

http.createServer(app).listen(port, () => {
  console.log(`listen port:${port}`);
});
