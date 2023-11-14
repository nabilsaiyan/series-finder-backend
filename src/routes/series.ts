import express, { Router, Request, Response } from 'express';
import { seriesData } from '../data/seriesData';

const seriesRouter: Router = express.Router();

seriesRouter.get('/search', (req: Request, res: Response) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required.' });
  }

  const matchingSeries = seriesData.filter((serie) =>
    serie.name.toLowerCase().includes(keyword.toString().toLowerCase()),
  );

  res.json(matchingSeries);
});

export default seriesRouter;
