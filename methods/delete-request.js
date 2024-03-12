const writeToFile = require('../utils/write-to-file');

module.exports = async (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    if (baseUrl === '/api/movies/') {
        try {
            let id = req.url.split('/')[3];

            if (!isNaN(id)) {
                let filterMovies = req.movies.filter((item) => item.id !== id);
                writeToFile(filterMovies);
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end();
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ title: 'Delete failed', message: "UUID is not valid" }));
            }


        } catch (error) {
            console.log(error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title: 'Delete failed', message: 'Movie not deleted' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Not found', message: `Route not found!!` }));
    }

}