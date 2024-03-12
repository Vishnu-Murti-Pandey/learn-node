module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    let id = req.url.split('/')[3];

    if (req.url === '/api/movies') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(req.movies));
        res.end();
    } else if (isNaN(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Validation Failed', message: `UUID not found!!` }));
    } else if (baseUrl === '/api/movies/' && !isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        let filterMovies = req.movies.filter((item) => item.id === id);

        if (filterMovies.length > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify(filterMovies));
            res.end();
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title: 'Validation Failed', message: `UUID not found!!` }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Not found', message: `Route not found!!` }));
    }

}