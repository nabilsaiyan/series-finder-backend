import express, { Router, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

const seriesRouter: Router = express.Router();

seriesRouter.get('/search', async (req: Request, res: Response) => {
  const url = `${TMDB_API_BASE_URL}/search/tv`;

  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required.' });
  }
  console.log('*********** TMDB_API_KEY:', TMDB_API_KEY);

  try {
    const tmdbResponse = await axios.get(url, {
      params: {
        query: keyword,
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    const matchingSeries = tmdbResponse.data.results;

    res.json(matchingSeries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from TMDB API.' });
  }
});

export default seriesRouter;
