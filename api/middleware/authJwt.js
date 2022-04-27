//const jwt = require("jsonwebtoken");
//const config = require("../configs");
//const db = require("../models");
//const authSession = require("./authSession")
const verifyToken = (req, res, next) => {
    console.log('Came on verify token....')
    next();
   // console.log('.........',req.headers);
    /* let token = req.headers["x-access-token"];
    let session = req.headers["x-session"]
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        try {
            await authSession.verifySession(session, req, res)
        } catch (error) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        
    }) */
};

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;