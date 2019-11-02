const express = require('express');
const router = express.Router();
const fotografiasController = require('../controllers/fotografias');
//Middlewares
const md_auth = require('../authenticated/authenticated');
const connectmultiParty = require('connect-multiparty');
const md_upload = connectmultiParty({ uploadDir: './uploads/images' });

//Ruta http://localhost:3000/images/
//sin middlwares
router.get('/', fotografiasController.getAllImages); //Listar todas las fotos
router.get('/:id', fotografiasController.getImage); //Obtener una foto por id
router.get('/:fotografia/:thumb', fotografiasController.sendFile); //Obtener la foto
//Middlewares
router.delete('/remove/image/:id', fotografiasController.deleteImage);
router.get('/img/privates/==0', md_auth.auth, fotografiasController.getImagesPrivate); //Obtener todas privadas
router.get('/search/images/:name', fotografiasController.searchImage); //Search Image 
router.post('/save/image', md_auth.auth, fotografiasController.createImage); //Crear foto
router.post('/upload/:id', [md_auth.auth, md_upload], fotografiasController.uploadImage); //Actualizar foto
router.put('/edit/:id', md_auth.auth, fotografiasController.updateImage); //Editar foto

module.exports = router;