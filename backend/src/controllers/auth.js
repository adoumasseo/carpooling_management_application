const { generateToken, verifyToken } = require('../config/jwt');
const redisClient = require('../config/redis');

/**
 * Store Refresh Token in Redis
 * @param {String} token - The refresh token
 * @param {String} userId - The user ID to associate with the token
 */
const storeRefreshToken = async (token, userId) => {
  const key = `refreshToken:${userId}`;
  await redisClient.set(key, token, { EX: 30 * 24 * 60 * 60 });
};

/**
 * Validate Refresh Token
 * @param {String} token - The refresh token
 * @param {String} userId - The user ID to validate against
 */
const validateRefreshToken = async (token, userId) => {
  const key = `refreshToken:${userId}`;
  const storedToken = await redisClient.get(key);
  return storedToken === token;
};

/**
 * Revoke Refresh Token
 * @param {String} userId - The user ID whose refresh token should be revoked
 */
const revokeRefreshToken = async (userId) => {
  const key = `refreshToken:${userId}`;
  await redisClient.del(key);
};

/**
 * Refresh Access Token
 */
const refreshAccessToken = async (req, res) => {
  const { refreshToken, userId } = req.body;

  if (!refreshToken || !userId) {
    return res.status(400).json({ error: 'Refresh token and user ID are required' });
  }

  try {
    const decoded = verifyToken(refreshToken, 'REFRESH_TOKEN');

    const isValid = await validateRefreshToken(refreshToken, userId);
    if (!isValid) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const newAccessToken = generateToken({ userName: decoded.fullName, userMail: decoded.email, userId: userId });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

/**
 * Revoke Refresh Token
 */
const revokeToken = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  await revokeRefreshToken(userId);
  res.json({ message: 'Refresh token revoked successfully' });
};

module.exports = { 
  storeRefreshToken,
  validateRefreshToken,
  revokeRefreshToken,
  refreshAccessToken,
  revokeToken
};
