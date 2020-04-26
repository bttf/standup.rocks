import jwt from 'jsonwebtoken';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

const AUTH_SECRET = process.env.AUTH_SECRET;

export default new BearerStrategy((token, done) => {
  jwt.verify(token, AUTH_SECRET, (err, decoded) => {
    if (err) done(err);
    done(null, decoded);
  });
});
