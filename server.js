import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Serve static assets from Vite build directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, { maxAge: '1d' }));

// Also serve public and src/assets for direct or legacy image URLs
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/src/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Health check endpoint for Render
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

// Single Page Application (SPA) fallback to index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Torres Capitol College Feedback System running on http://${HOST}:${PORT}`);
});
