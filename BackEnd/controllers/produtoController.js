const Produto = require("../models/produto");

module.exports = {
  getDadosProdutoPorId(req, res) {
    id_produto = req.params.id_produto;

    Produto.getDadosProdutoPorId(id_produto, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro ao procurar o produto",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },

  setProduto(req, res) {
    const produto = JSON.parse(req.body.produto);

    Produto.setProduto(produto, (err, data) => {
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

  async updateProduto(req, res) {
    const usuario = JSON.parse(req.body.usuario);

    Produto.updateProduto(usuario, (err, produtoAtualizado) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro do produto",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O produto foi atualizado corretamente",
        data: produtoAtualizado,
      });
    });
  },

  async deleteProduto(req, res) {
    const id_produto = req.params.id_produto;

    Produto.deleteProduto(id_produto, (err, id_produto) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com a remoção do produto",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O produto foi removido corretamente",
        data: id_produto,
      });
    });
  },
};
