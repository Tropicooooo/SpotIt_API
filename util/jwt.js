import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config.js';

export const sign = (payload, options) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);
};

export const verify = (jwt, options = {}) => {
  return jsonwebtoken.verify(jwt, process.env.JWT_SECRET, options);
};
