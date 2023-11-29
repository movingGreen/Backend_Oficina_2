const PedidoProduto = require("../models/pedido_produto");

module.exports = {
  getPedidoProduto(req, res) {
    id_produto = req.params.id_produto;
    id_pedido = req.params.id_pedido;

    PedidoProduto.getPedidoProduto(id_produto, id_pedido, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro ao procurar o pedido produto",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },

  setPedidoProduto(req, res) {
    const pedidoProduto = JSON.parse(req.body.pedidoProduto);

    PedidoProduto.setPedidoProduto(pedidoProduto, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro do pedido produto",
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

  async updatePedidoProduto(req, res) {
    const pedidoProduto = JSON.parse(req.body.pedidoProduto);

    PedidoProduto.updatePedidoProduto(pedidoProduto, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro do pedido produto",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O pedido produto foi atualizado corretamente",
        data: data,
      });
    });
  },

  async deletePedidoProduto(req, res) {
    const id_pedido = req.params.id_pedido;
    const id_produto = req.params.id_produto;

    PedidoProduto.deletePedidoProduto(id_pedido, id_produto, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com a remoção do pedidoProduto",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O pedido produto foi removido corretamente",
        data: data,
      });
    });
  },
};
