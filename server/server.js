const express = require('express');
const app = express();
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const port = process.env.PORT || 8080;

app.use(express.static(distPath));

app.listen(port, function() {
  console.log('Express server listening on port: ' + port);
  console.log('env = ' + process.env.NODE_ENV + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});
