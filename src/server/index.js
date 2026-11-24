const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const WEB_DIR = path.join(__dirname, '..', 'web');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  const reqUrl = req.url.split('?')[0];
  const filename = reqUrl === '/' ? 'index.html' : reqUrl.replace(/^\//, '');
  const filePath = path.join(WEB_DIR, filename);

  if (!filePath.startsWith(WEB_DIR)) {
    res.writeHead(403);
    return res.end('Acesso proibido');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Não Encontrado');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor HTTP ouvindo em http://localhost:${PORT}`);
});
