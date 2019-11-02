const models = require('../models');
const jwt = require('../services/jwt');

const findEmail = async(req, res) => {
    const user = await models.usuarios.findOne({
        where: {
            email: req.params.email
        }
    })
    if (user) {
        res.status(200).send({ user });
    } else {
        res.status(404).send({ message: 'User not found' });
    }

}

const createUser = async(req, res) => {
    const userEmail = await models.usuarios.findOne({
        where: {
            email: req.body.email
        }
    })
    if (userEmail) {
        res.send({ message: 'Email already in use' });
    } else {
        models.usuarios.create(req.body)
            .then(user => {
                res.status(200).send(user);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
}

const login = (req, res) => {
    const { email, password } = req.body;
    models.usuarios.findOne({ where: { email, password } })
        .then(user => {
            if (user) {
                //Si recibo como parametro token == true 
                if (req.body.token) {
                    //le paso el usuario y me devuelve el token
                    res.status(200).send({ token: jwt.createToken(user) });
                } else {
                    res.status(200).send({ user });
                }
            } else {
                res.status(401).send({ message: "User not found." });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

const getAll = (req, res) => {
    models.usuarios.findAll()
        .then(users => {
            res.status(200).send({ users });
        })
        .catch(err => {
            res.status(500).send({ message: "error searching for users" });
        })
}

module.exports = {
    findEmail,
    createUser,
    login,
    getAll
};