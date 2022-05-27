const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // check for token
    const token = req.header('x-auth-token');


    // check if token is present
    if(!token) return res.status(401).json({msg: 'no token, authorisation denied'});

    // validate the token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();

    }catch(err){
        res.status(401).json({msg:'token is not valid'});
    }
}