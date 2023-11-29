const pedido_produtoController = require("../controllers/pedido_produtoController");

module.exports = (app) => {
  app.get(
    "/api/pedido_produto/getPedidoProduto/:id_produto/:id_pedido",
    pedido_produtoController.getPedidoProduto
  );

  app.post(
    "/api/pedido_produto/setPedidoProduto",
    pedido_produtoController.setPedidoProduto
  );

  app.put(
    "/api/pedido_produto/updatePedidoProduto",
    pedido_produtoController.updatePedidoProduto
  );

  app.delete(
    "/api/pedido_produto/deletePedidoProduto/:id_produto/:id_pedido",
    pedido_produtoController.deletePedidoProduto
  );
};
