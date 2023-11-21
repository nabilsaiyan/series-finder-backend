import express, { Router, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { TMDB_API_BASE_URL } from '../utils/constants';
import { query, validationResult } from 'express-validator';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const seriesRouter: Router = express.Router();

seriesRouter.get(
  '/search',
  [query('keyword').notEmpty().trim().escape()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const url = `${TMDB_API_BASE_URL}/search/tv`;
    const query = req.query.keyword;

    if (!query) {
      return res.status(400).json({ error: 'Keyword is required.' });
    }

    try {
      const tmdbResponse = await axios.get(url, {
        params: {
          query,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      });

      const matchingSeries = tmdbResponse.data.results;

      res.json(matchingSeries);
    } catch (error) {
      console.error('TMDB API Error:', error);
      res.status(500).json({ error: 'Failed to fetch data from TMDB API.' });
    }
  },
);

seriesRouter.get('/trending', async (req: Request, res: Response) => {
  const url = `${TMDB_API_BASE_URL}/trending/tv/week?language=en-US`;

  try {
    const tmdbResponse = await axios.get(url, {
      params: {
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    const matchingSeries = tmdbResponse.data.results;

    res.json(matchingSeries);
  } catch (error) {
    console.error('TMDB API Error:', error);
    res.status(500).json({ error: 'Failed to fetch data from TMDB API.' });
  }
});

export default seriesRouter;
