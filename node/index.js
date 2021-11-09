const requestHanler = require('./request-handler');
const recursos = require('./recursos');
const hostname = '127.0.0.1';
const port = 4000;

global.recursos = recursos;

requestHanler.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
