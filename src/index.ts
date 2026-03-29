import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import marquesRoutes from './routes/marques';
import vehiculesRoutes from './routes/vehicules';
import messagesRoutes from './routes/messages';
import uploadRoutes from './routes/upload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/marques', marquesRoutes);
app.use('/api/vehicules', vehiculesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
