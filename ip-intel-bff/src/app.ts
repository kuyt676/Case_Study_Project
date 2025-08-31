import express from 'express';
import cors from 'cors';
import intelRoutes from './routes/intel.routes';

const app = express();

app.use(cors());
app.use(express.json());

// רישום הראוטים
app.use('/api', intelRoutes);

export default app;
