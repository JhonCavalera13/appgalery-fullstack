const nJwt = require('njwt');
const config = require('../config/config');
const secret = config.token_secret;

function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "La petición no tiene el header de autenticacion" })
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");
    const payload = nJwt.verify(token, secret, (err, verifiedJwt) => {
        if (err) {
            return res.status(401).send({ message: "Acceso no authorizado" });
        }
        else {
            next();
        }
    });
}

module.exports = {
    auth
};