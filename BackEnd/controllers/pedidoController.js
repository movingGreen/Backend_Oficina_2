const Pedido = require("../models/pedido");

module.exports = {
  getDadosPedidoPorId(req, res) {
    id_pedido = req.params.id_pedido;

    Pedido.getDadosPorId(id_pedido, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro ao procurar o pedido",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },

  setPedido(req, res) {
    const pedido = JSON.parse(req.body.pedido);

    Pedido.setPedido(pedido, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro do pedido",
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

  async updatePedido(req, res) {
    const pedido = JSON.parse(req.body.pedido);

    Pedido.updatePedido(pedido, (err, pedidoAtualizado) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro do pedido",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O pedido foi atualizado corretamente",
        data: pedidoAtualizado,
      });
    });
  },

  async deletePedido(req, res) {
    const id_pedido = req.params.id_pedido;

    Pedido.deletePedido(id_pedido, (err, id_pedido) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com a remoção do pedido",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O pedido foi removido corretamente",
        data: id_pedido,
      });
    });
  },
};
