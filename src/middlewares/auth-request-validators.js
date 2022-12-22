const validateUserAuth = (req, res, next) =>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data: {},
            err: 'Email or password missing in the request',
            message: 'Something went wrong'
        })
    }
    next();
}

module.exports = {
    validateUserAuth
}