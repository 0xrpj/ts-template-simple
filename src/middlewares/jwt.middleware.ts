import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@config';
import { logger } from '@utils/logger';

const jwtMiddleware = (): RequestHandler => {
  return (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')[1];
      jwt.verify(bearer, JWT_SECRET, (err, authData) => {
        if (err) {
          next(new HttpException(401, "Who is't art thee? art thee trying to snoop in? Unauthorized."));
        } else {
          logger.debug('Authdata' + authData);
          next();
        }
      });
    } else {
      next(new HttpException(401, "Who is't art thee? art thee trying to snoop in? Unauthorized."));
    }
  };
};

export default jwtMiddleware;
