/**
 * LearnHub - Static Local Web Server (Node.js)
 * Serves the entire LearnHub platform locally on port 3000.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);
    if (pathname === '/') pathname = '/index.html';

    const safePath = path.normalize(path.join(__dirname, pathname));
    if (!safePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    fs.stat(safePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head><title>404 Not Found | LearnHub</title></head>
                <body style="font-family: sans-serif; text-align: center; padding: 50px;">
                    <h2>404 - Page Not Found</h2>
                    <p>The file <code>${pathname}</code> was not found.</p>
                    <a href="/index.html">Back to LearnHub Home</a>
                </body>
                </html>
            `);
            return;
        }

        const ext = path.extname(safePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(safePath).pipe(res);
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`=======================================================`);
    console.log(`🎓 LearnHub Student Learning Platform is Running!`);
    console.log(`🔗 Local URL: http://localhost:${PORT}/`);
    console.log(`=======================================================`);
});
