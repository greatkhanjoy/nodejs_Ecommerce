const jwt = require('jsonwebtoken')

const authMiddleware = async(req, res, next) => {
    
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Not authorized!'})
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        req.user = {id: decoded.id, name: decoded.name}
    } catch (error) {
        res.status(401).json('Not authorized')
    }

    next()
}

module.exports = authMiddleware