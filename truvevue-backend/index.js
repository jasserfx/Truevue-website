import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { rateLimit } from 'express-rate-limit';
import { initDB } from './db/database.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import contentRoutes from './routes/content.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

await initDB();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:5500',
  'http://localhost:8080',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:8080',
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

const contactLimiter = rateLimit({ windowMs: 15*60*1000, max: 5, message: { error: 'Too many submissions, please try again later.' } });

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.get('/admin/{*path}', (req, res) => res.sendFile(path.join(__dirname, 'public/admin/index.html')));

app.listen(PORT, () => {
  console.log(`\n✅ TrueVue backend running → http://localhost:${PORT}`);
  console.log(`🔧 Admin panel          → http://localhost:${PORT}/admin\n`);
});