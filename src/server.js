const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const proxy = require('http-proxy-middleware');
const Router = require('./api');
const { API_HOST, API_PORT, PORT } = require('./config');
const app = express();

app.set('views', path.join(__dirname, '../dist'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../dist')));

app.use(cors());
app.use(cookieParser('Kvb6swFdB&m66sk4aSB9pSKm'));
app.use('/', proxy({
    target: `http://${API_HOST}:${API_PORT}/`,
    changeOrigin: true,
    secure: false
}));
app.use(session({
    secret: 'Kvb6swFdB&m66sk4aSB9pSKm',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());


app.use(Router);

app.get('*', (req, res, next) => {
    res.sendfile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});
