const requestBodyParser = require('../utils/body-parser');
const writeToFile = require('../utils/write-to-file');

module.exports = async (req, res) => {
    if (req.url === '/api/movies') {
        try {
            let body = await requestBodyParser(req);
            body.id = String(req.movies.length + 1);
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end();

        } catch (error) {
            console.log(error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title: 'Validation Failed', message: `UUID not found!!` }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Not found', message: `Route not found!!` }));
    }

}