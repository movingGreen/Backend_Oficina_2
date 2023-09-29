const passport = require('passport');
const addressController = require('../controllers/addressController');

module.exports = (app, upload) => {

    app.get('/api/address/findByUser/:id_user', passport.authenticate('jwt', {session: false}), addressController.findByUser);

    app.post('/api/address/create', passport.authenticate('jwt', {session: false}), addressController.create);

    // app.put('/api/categories/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image', 1), categoriesController.updateWithImage);
    // app.put('/api/categories/update', passport.authenticate('jwt', {session: false}), categoriesController.update);

    // app.delete('/api/categories/delete/:id', passport.authenticate('jwt', {session: false}), categoriesController.delete);

}