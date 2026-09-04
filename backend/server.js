import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Member 4 routes (Stats) - Re-evaluating import casing
import statsRouter from './routes/stats.js';
app.use('/api', statsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
