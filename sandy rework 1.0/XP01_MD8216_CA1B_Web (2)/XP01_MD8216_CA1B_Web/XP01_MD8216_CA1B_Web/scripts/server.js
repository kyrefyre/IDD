import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const hostname = '127.0.0.1';
const port = 8080;

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer((req, res) => {
    console.log(`Request URL (encoded): ${req.url}`); // Log the request URL

    // Decode the URL to handle spaces and special characters
    const decodedUrl = decodeURIComponent(req.url);
    console.log(`Request URL (decoded): ${decodedUrl}`); // Log the decoded URL

    // Serve `senhome.html` by default for `/` requests
    let filePath = path.join(
        __dirname,
        '..', // Go up one level from the `scripts` folder
        decodedUrl === '/' ? 'senhome.html' : decodedUrl
    );

    console.log(`Resolved File Path: ${filePath}`); // Debugging file path

    let extname = path.extname(filePath).toLowerCase();
    let mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.glb': 'model/gltf-binary', // Added support for GLB files
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.error(`Error reading file: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>', 'utf-8');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
