import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 5 minutes
  max: 200, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

export default limiter;
