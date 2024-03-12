const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const getReq = require('./methods/get-request');
const postReq = require('./methods/post-request');
const putReq = require('./methods/put-request');
const patchReq = require('./methods/patch-request');
const deleteReq = require('./methods/delete-request');

let movies = require('./data/movies.json');

const PORT = process.env.PORT || 8001;

const server = http.createServer((req, res) => {
    req.movies = movies
    switch (req.method) {
        case 'GET':
            getReq(req, res);
            break;
        case 'POST':
            postReq(req, res);
            break;
        case 'PUT':
            putReq(req, res);
            break;
        case 'PATCH':
            patchReq(req, res);
            break;
        case 'DELETE':
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.write(
                JSON.stringify({ title: 'Not found', message: "Route not found!!" })
            );
            res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});