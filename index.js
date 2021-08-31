// inject/serve up the website's html sections
// using components/modules

let config = {
  root: 'public',
  port: 3000
}

(function () {
  const express = require('express');
  const app = express();
  app.use(express.static(config.root));
  app.listen(config.port);
})(config);
