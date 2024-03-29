const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token does not exist
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization failed' });
    }

    // Verify token
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if(error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            }
            else {
                req.user = decoded.user;
                next();
            }
        });
    } catch(err) {
        console.log('Something is wrong with auth middleware');
        res.status(500).send({ msg: 'Server Error' });
    }
};

module.exports = auth;