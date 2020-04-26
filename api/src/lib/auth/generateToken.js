import jwt from 'jsonwebtoken';

const AUTH_SECRET = process.env.AUTH_SECRET;

export default (payload, expiresIn) => jwt.sign(payload, AUTH_SECRET, { expiresIn });
