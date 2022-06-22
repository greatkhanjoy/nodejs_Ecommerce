const { VerifyJWT } = require('../Utills')

const authorizeUser = async (req, res, next) => {
  if (!req.signedCookies.token) {
    return res.status(401).json({ msg: 'Unauthorized . Please login' })
  }
  const payload = await VerifyJWT(req.signedCookies.token)
  if (!payload) {
    return res.status(401).json({ msg: 'Invalid Token' })
  }
  req.user = payload
  next()
}

const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Unauthorized!' })
  }
  next()
}

const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ msg: 'Unauthorized!' })
    }
    next()
  }
}

module.exports = { authorizeUser, isAdmin, authorizedPermissions }
