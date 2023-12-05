const { validatesignature } = require('./side');

module.exports = async (req, res, next) => {
  const isauthorized = await validatesignature(req);
  if (isauthorized) {
    return next();
  }
  return res.status(403).json({ message: 'not authorized' });
};
