import express from 'express';
import seriesRouter from './routes/series';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/series', seriesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
