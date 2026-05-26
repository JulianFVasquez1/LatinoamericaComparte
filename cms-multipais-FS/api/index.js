import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import paisRoutes from './routes/paisRoutes.js';
import userRoutes from './routes/userRoutes.js';
import noticiaRoutes from './routes/noticiaRoutes.js';
import testimonioRoutes from './routes/testimonioRoutes.js';
import solicitudRoutes from './routes/solicitudRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import archivoRoutes from './routes/archivoRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

dotenv.config();

const app = express();

app.set('trust proxy', true);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL || '',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'API CMS multipais funcionando correctamente',
    version: '1.0.0'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/paises', paisRoutes);
app.use('/api/users', userRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/api/testimonios', testimonioRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/auditoria', auditRoutes);
app.use('/api/archivos', archivoRoutes);
app.use('/api/public', publicRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

export default app;
