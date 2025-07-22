import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Папка для отдачи файлов (dist после сборки, иначе public)
const staticDir = path.join(__dirname, 'dist');
const fallbackDir = path.join(__dirname, 'public');

app.use(express.static(staticDir));
app.use(express.static(fallbackDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'), err => {
    if (err) {
      res.sendFile(path.join(fallbackDir, 'index.html'));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 