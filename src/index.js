const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const myRouter = require('./route');
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use('/api/v1', myRouter)

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

