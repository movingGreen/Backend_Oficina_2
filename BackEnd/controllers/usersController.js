const bcrypt = require('bcryptjs/dist/bcrypt');
const Rol = require('../models/rol');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {
    
    findDeliveryMen(req, res) {
        User.findDeliveryMen((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Ocorreu um erro ao listar os entregadores',
                    error: err
                });
            }

            return res.status(201).json(data);
        })
    },

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Ocorreu um erro com o registro do usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ //O CLIENTE NAO TEM AUTORIZACAO PARA REALIZAR ESTA ACAO
                    success: false,
                    message: 'O email nao foi encontrado',
                    error: err
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {})

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: JSON.parse(myUser.roles)
                }
                
                return res.status(201).json({
                    success: true,
                    message: 'O usuario foi autenticado',
                    data: data // O ID DO NOVO USUARIO QUE FOI REGISTRADO
                });
            }
            else {
                return res.status(401).json({ //O CLIENTE NAO TEM AUTORIZACAO PARA REALIZAR ESTA ACAO
                    success: false,
                    message: 'Senha incorreta'
                });
            }

        })

    },

    register(req, res) {

        const user = req.body; // capturando os dados que vem do cliente
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Ocorreu um erro com o registro do usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'O registro foi feito corretamente',
                data: data // O ID DO NOVO USUARIO QUE FOI REGISTRADO
            });
        })
    },

    async registerWithImage(req, res) {

        const user = JSON.parse(req.body.user); // capturando os dados que vem do cliente

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Ocorreu um erro com o registro do usuario',
                    error: err
                });
            }

            user.id = `${data}`;
            const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;

            Rol.create(user.id, 3, (err, data) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Ocorreu um erro com o registro do rol do usuario',
                        error: err
                    });
                }
                
                return res.status(201).json({
                    success: true,
                    message: 'O registro foi feito corretamente',
                    data: user 
                })
            });
        })
    },

    async updateWithImage(req, res) {

        const user = JSON.parse(req.body.user); // capturando os dados que vem do cliente

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.update(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Ocorreu um erro com o registro do usuario',
                    error: err
                });
            }
            
            return res.status(201).json({
                success: true,
                message: 'O usuario foi atualizado corretamente',
                data: user
            });
        })
    },

    async updateWithoutImage(req, res) {

        const user = req.body; // capturando os dados que vem do cliente

        User.updateWithoutImage(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Ocorreu um erro com o registro do usuario',
                    error: err
                });
            }
            
            return res.status(201).json({
                success: true,
                message: 'O usuario foi atualizado corretamente',
                data: user
            });
        })
    },

    async updateNotificationToken(req, res) {

        const id = req.body.id; 
        const token = req.body.token;
        console.log('ID ', id); 
        console.log('TOKEN ', token); 

        User.updateNotificationToken(id, token, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Ocorreu um erro com a atualizacao do token',
                    error: err
                });
            }
            
            return res.status(201).json({
                success: true,
                message: 'O token foi atualizado corretamente',
                data: id
            });
        })
    }
}