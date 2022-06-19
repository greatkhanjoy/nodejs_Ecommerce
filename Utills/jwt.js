const jwt = require('jsonwebtoken')


const CreateJWT = (user) => {
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP})
    return token
}

const VerifyJWT = (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    return payload
}

const attachCookies = (res, user) => {
    const token = CreateJWT(user)
    const oneDay = 24 * 60 * 60 * 1000;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true

    })

}



module.exports = {CreateJWT, VerifyJWT, attachCookies}

