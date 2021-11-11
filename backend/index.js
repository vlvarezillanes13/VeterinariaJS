const requestHanler = require('./request-handler');
const hostname = '127.0.0.1';
const port = 4000;


requestHanler.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
