import express from 'express';
import seriesRouter from './routes/series';
import dotenv from 'dotenv';
var cors = require('cors');

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());

app.use('/series', seriesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
