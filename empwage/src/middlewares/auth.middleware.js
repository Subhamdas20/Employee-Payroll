import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const empAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };

    const user = await jwt.verify(bearerToken, process.env.TOKEN_SECRET, ((err, decoder) => {
      if (err) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: "UNAUTHORIZED" })
      }
      else {
        req.body['data'] = decoder;
        next();
      }
    }))
  }
  catch (error) {
      next(error);
  }
}
