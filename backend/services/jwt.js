const nJwt = require('njwt');
const config = require('../config/config');
const secret = config.token_secret;

exports.createToken = (usuario) => {
    const params = {
        sub: usuario.id,
        usuario: usuario.email,
    }

    const jwt = nJwt.create(params, secret);
    const t = new Date();
    t.setHours(t.getHours() + 3);
    jwt.setExpiration(t);

    const token = jwt.compact();
    return token;

}