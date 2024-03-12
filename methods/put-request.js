const requestBodyParser = require('../utils/body-parser');
const writeToFile = require('../utils/write-to-file');

module.exports = async (req, res) => {

    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    console.log(baseUrl);
    if (baseUrl === '/api/movies/') {
        const body = await requestBodyParser(req);
        let id = req.url.split('/')[3];

        if (!isNaN(id)) {
            let filterMovies = req.movies.filter((item) => item.id !== id);
            filterMovies.push(body);
            writeToFile(filterMovies);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end();
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title: 'Update failed', message: "UUID is not valid" }));
        }

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Not found', message: `Route not found!!` }));
    }

}