const pedidoController = require("../controllers/pedidoController");

module.exports = (app) => {
  app.get(
    "/api/pedido/getDadosPedidoPorId/:id_pedido",
    pedidoController.getDadosPedidoPorId
  );

  app.post("/api/pedido/setPedido", pedidoController.setPedido);

  app.put("/api/pedido/updatePedido", pedidoController.updatePedido);

  app.delete(
    "/api/pedido/deletePedido:id_pedido",
    pedidoController.deletePedido
  );
};
