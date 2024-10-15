const jwt = require('jsonwebtoken')
const config = require("../../config/config");

module.exports = (req,res,next)=>{
    if(req.method === 'OPTIONS'){
        return next();
    }

    try {
        const authorization = req.headers.authorization
        const token = authorization.split(' ')[1] //Bearer TOKEN

        if(!token){
            return res.status(401).json({
                result: 'ERROR',
                data: null,
                message: 'Server ERROR!',
                details: 'Unauthorized'
            })
        }

        const decoded = jwt.verify(token,config.JWT_SECRET)

        req.user = decoded
        next()

    }catch (e) {
        console.log('Error middleware:',e)
        return res.status(401).json({
            result: 'ERROR',
            data: null,
            message: 'Server ERROR!',
            details: 'Not auth'
        })
    }

}
