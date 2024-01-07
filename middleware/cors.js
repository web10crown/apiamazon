// middleware/cors.js
import Cors from 'cors';
import initMiddleware from '../util/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default cors;
