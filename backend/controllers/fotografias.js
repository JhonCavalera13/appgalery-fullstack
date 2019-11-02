const models = require('../models');
//file system crud
const fs = require('fs');
const { thumb } = require('node-thumbnail');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAllImages = (req, res) => {
    models.fotografia.findAll({
            where: {
                private: !1
            }
        })
        .then(images => { res.status(200).send({ images }) })
        .catch(err => {
            res.status(500).send({ message: "Error searching images" });
        });
}

const createImage = (req, res) => {
    models.fotografia.create(req.body)
        .then(image => {
            res.status(200).send({ image });
        })
        .catch(err => {
            res.status(500).send({ message: "Error saving image" });
        })
}


const findOneImage = (id, { onSuccess, onNotFound, onError }) => {
    models.fotografia
        .findOne({ where: { id } })
        .then(image => (image ? onSuccess(image) : onNotFound()))
        .catch(() => onError());
};

const getImage = (req, res) => {
    findOneImage(req.params.id, {
        onSuccess: image => res.send(image),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    })
}

const updateImage = (req, res) => {
    const { id } = req.params;
    const onSuccess = image =>
        image.update(req.body)
        .then(() => res.status(200).send({ image }))
        .catch(() => res.sendStatus(500));
    findOneImage(id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.status(500).send({ message: "Error updating image" })
    });
}

const uploadImage = (req, res) => {
    const id = req.params.id;
    if (req.files) {
        var file_path = req.files.img.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var extencion = file_name.split('\.')
        var file_ext = extencion[1]

        if (file_ext == 'jpg') {
            var img = {}
            img.image = file_name;

            models.fotografia.findByPk(id)
                .then(image => {
                    image.update(img)
                        .then(() => {
                            var newPath = './uploads/images/' + file_name;
                            var thumbPath = './uploads/images/thumbs';
                            thumb({
                                    source: path.resolve(newPath),
                                    destination: path.resolve(thumbPath),
                                    width: 200,
                                    suffix: ''
                                })
                                .then(() => {
                                    res.status(200).send({ image });
                                })
                                .catch(err => {
                                    res.status(500).send({ message: 'Error creating thumbnail' });
                                })
                        })
                        .catch(err => {
                            fs.unlink(file_path, (err) => {
                                if (err) {
                                    res.status(500).send({ message: 'Error deleting file' });
                                }
                            });
                            res.status(500).send({ message: 'Error updating image' });
                        });
                })
                .catch(err => {
                    //Llega la imagen y como no se encontro el id para actualizar se borra
                    fs.unlink(file_path, (err) => {
                        if (err) {
                            res.status(500).send({ message: 'Error deleting file' });
                        }
                    })
                    res.status(500).send({ message: 'Image not exist' });
                });
        } else {
            //sea cual sea el archivo, llega igual y se borra en el instante
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(500).send({ message: 'Error deleting file' });
                }
            });
            res.status(500).send({ message: 'Image extension is not valid' });
        }
    } else {
        res.status(400).send({ message: 'Select image' });
    }
}

const sendFile = (req, res) => {
    const { fotografia, thumb } = req.params;

    if (thumb == 'false') {
        var path_foto = './uploads/images/' + fotografia;
    } else if (thumb == "true") {
        var path_foto = './uploads/images/thumbs/' + fotografia;
    }
    fs.exists(path_foto, exists => {
        if (exists) {
            res.sendFile(path.resolve(path_foto));
        } else {
            res.status(404).send({ message: 'error searching image' });
        }
    })

}

const getImagesPrivate = (req, res) => {
    models.fotografia.findAll({
            where: {
                private: 1
            },
            order: [
                ['id', 'ASC']
            ]
        })
        .then(images => {
            images.length > 0 ? res.status(200).send({ images }) : res.status(401).send({ message: "images not found." });;
        })
        .catch(err => {
            res.status(500).send({ message: "Error searching images" });
        });
}

const findOneImageByName = (name, { onSuccess, onNotFound, onError }) => {
    models.fotografia
        .findOne({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        .then(image => (image ? onSuccess(image) : onNotFound()))
        .catch(() => onError());
}

const searchImage = (req, res) => {
    findOneImageByName(req.params.name, {
        onSuccess: image => res.send(image),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
}


const deleteImage = (req, res) => {
    const onSuccess = image =>
        image
        .destroy()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
    findOneImage(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
}

module.exports = {
    getAllImages,
    createImage,
    getImage,
    updateImage,
    uploadImage,
    sendFile,
    getImagesPrivate,
    searchImage,
    deleteImage
}