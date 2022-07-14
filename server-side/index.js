const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// import external module
const errorHandler = require('./middleware/errorHandling');
const notFoundHandler = require('./middleware/notFoundHandler');
const javaCompiler = require('./routes/javaCompiler');
const pythonCompiler = require('./routes/pythonCompiler');
const cplusplusCompiler = require('./routes/cplusplusComplier');
const goComplier = require('./routes/goComplier');

// define port number
const port = process.env.PORT || 5000;

// enable all cors request
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/java', javaCompiler);
app.use('/python', pythonCompiler);
app.use('/cpp', cplusplusCompiler);
app.use('/go', goComplier);

// 404 not found handler
app.all(notFoundHandler);

// Error Handler
app.use(errorHandler);

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}/`);
});
