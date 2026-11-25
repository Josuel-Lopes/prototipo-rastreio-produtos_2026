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
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const liveReloadClients = new Set();
let reloadDebounce = null;

try {
  fs.watch(WEB_DIR, { recursive: true }, (eventType, filename) => {
    if (reloadDebounce) clearTimeout(reloadDebounce);
    reloadDebounce = setTimeout(() => {
      console.log(`[live-reload] Arquivo alterado (${filename}). Atualizando navegador...`);
      for (const client of liveReloadClients) {
        client.write('data: reload\n\n');
      }
    }, 120);
  });
} catch (err) {
  console.error('[live-reload] Erro ao monitorar pasta web:', err.message);
}

const LIVE_RELOAD_SCRIPT = `
<script>
  (function() {
    let es;
    function connect() {
      es = new EventSource('/live-reload');
      es.onmessage = function(e) {
        if (e.data === 'reload') {
          window.location.reload();
        }
      };
      es.onerror = function() {
        es.close();
        setTimeout(connect, 1500);
      };
    }
    connect();
  })();
</script>
`;

const server = http.createServer((req, res) => {
  const reqUrl = req.url.split('?')[0];

  // Rota de Server-Sent Events para Live-Reload automático sem F5
  if (reqUrl === '/live-reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('data: connected\n\n');
    liveReloadClients.add(res);

    req.on('close', () => {
      liveReloadClients.delete(res);
    });
    return;
  }

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
    
    // Injeta automaticamente o script de live reload se for HTML
    let body = data;
    if (ext === '.html') {
      const htmlStr = data.toString('utf-8');
      body = htmlStr.includes('</body>')
        ? htmlStr.replace('</body>', `${LIVE_RELOAD_SCRIPT}</body>`)
        : htmlStr + LIVE_RELOAD_SCRIPT;
    }

    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(body);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor HTTP ouvindo em http://localhost:${PORT} com Live-Reload ativo`);
});
