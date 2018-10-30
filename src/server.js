const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, '../dist'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res, next) => {
    res.render('index');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
