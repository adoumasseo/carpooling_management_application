const jwt = require('jsonwebtoken');

/**
* Generate ACCESS_TOKEN or REFRESH_TOKEN
* @param {*} userCredentials 
* @param {*} type - the type of TOKEN to generate
* @returns the token
*/
const generateToken = (userCredentials, type='ACCESS_TOKEN') => {
  const secret = type === 'REFRESH_TOKEN' ? process.env.JWT_REFRESH_TOKEN_SECRET : process.env.JWT_TOKEN_SECRET;
  const expiresIn = type === 'REFRESH_TOKEN' ? '30d' : '15m';
  
  const payload = {
    userName: userCredentials.fullName,
    userMail: userCredentials.email,
    ...(type === 'REFRESH_TOKEN' ? {} : {userId: userCredentials.id})
  }
  
  return jwt.sign(payload, secret, { expiresIn });
}

/**
* Verify a token 
* @param {*} token to verify
* @param {*} type of token to verify ACCESS TOKEN or REFRESH TOKEN
* @returns the payload or throw an error
*/
const verifyToken = (token, type='ACCESS_TOKEN') => {
  const secret = type === 'REFRESH_TOKEN' ? process.env.JWT_REFRESH_TOKEN_SECRET : process.env.JWT_TOKEN_SECRET;
  
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Invalid or expire Token');
  }
}

module.exports = {
  generateToken,
  verifyToken
}
