const redisErrorHandler = (req, res, next) => {
  if (!redisClient.isOpen) {
    return res.status(500).json({ error: 'Redis is not connected' });
  }
  next();
};

module.exports = redisErrorHandler;
