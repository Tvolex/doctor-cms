const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require ('body-parser');
const favicon = require('serve-favicon');
const cookieParser = require ('cookie-parser');
const proxy = require('http-proxy-middleware');
const { API_HOST, PORT } = require('./config');
const app = express();

app.set('views', path.join(__dirname, '../dist'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../dist')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

app.use(cors());
app.use(cookieParser('Kvb6swFdB&m66sk4aSB9pSKm'));
app.use('/api', proxy({
    target: `http://${API_HOST}`,
    changeOrigin: true,
    secure: false,
	proxyTimeout: 1000 * 60,
    timeout: 1000 * 60,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    fs.readFile(path.join(__dirname, '../dist/index.html'), 'utf-8', (err, content) => {
        if (err) {
            console.log('error with read index.html')
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(content)
    })
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});
