const Usuario = require("../models/usuario");

module.exports = {
  login(req, res) {
    const usuario = req.body.loginUsuario;
    const loginSenha = req.body.loginSenha;

    Usuario.login(usuario, loginSenha, async (err, meuUsuario) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o login do usuario",
          error: err,
        });
      }

      if (!meuUsuario) {
        return res.status(401).json({
          success: false,
          message: "O usuario nao foi encontrado",
          error: err,
        });
      }

      const usuarioLogado = {
        id_usuario: meuUsuario.id_usuario,
        nome: meuUsuario.nome,
        cpf: meuUsuario.cpf,
        email: meuUsuario.email,
        telefone: meuUsuario.telefone,
        tipo_usuario: meuUsuario.tipo_usuario,
        endereco: meuUsuario.endereco,
      };

      return res.status(201).json({
        success: true,
        message: "O usuario foi autenticado",
        data: usuarioLogado, // O ID DO NOVO USUARIO QUE FOI REGISTRADO
      });
    });
  },

  getDadosPorId(req, res) {
    id_usuario = req.params.id_usuario;

    Usuario.getDadosPorId(id_usuario, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro ao procurar o usuario",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },

  setUsuario(req, res) {
    const usuario = JSON.parse(req.body.usuario);

    Usuario.setUsuario(usuario, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro do usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O registro foi feito corretamente",
        data: data, // O ID DO NOVO USUARIO QUE FOI REGISTRADO
      });
    });
  },

  async updateUsuario(req, res) {
    const usuario = JSON.parse(req.body.usuario);

    Usuario.updateUsuario(usuario, (err, usuarioAtualizado) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro do usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O usuario foi atualizado corretamente",
        data: usuarioAtualizado,
      });
    });
  },

  async deleteUsuarioPorId(req, res) {
    const id_usuario = req.params.id_usuario;

    Usuario.deleteUsuarioPorId(id_usuario, (err, id_usuario) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com a remoção do usuario",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O usario foi removido corretamente",
        data: id_usuario,
      });
    });
  },
};
