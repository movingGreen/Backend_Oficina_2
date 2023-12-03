const produtoController = require("../controllers/produtoController");

module.exports = (app) => {
  app.get(
    "/api/produto/getDadosProdutoPorId/:id_produto",
    produtoController.getDadosProdutoPorId
  );

  app.post("/api/produto/setProduto", produtoController.setProduto);

  app.put("/api/produto/updateProduto", produtoController.updateProduto);

  app.delete(
    "/api/produto/deleteProduto/:id_produto",
    produtoController.deleteProduto
  );
};
