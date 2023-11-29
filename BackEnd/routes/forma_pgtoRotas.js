const forma_pgtoController = require("../controllers/forma_pgtoController");

module.exports = (app) => {
  app.get(
    "/api/forma_pgto/getTipoDePagamentoPorId/:id_forma_pgto",
    forma_pgtoController.getTipoDePagamentoPorId
  );

  app.post(
    "/api/forma_pgto/setTipoDePagamento",
    forma_pgtoController.setTipoDePagamento
  );

  app.put(
    "/api/forma_pgto/updateTipoDePagamento",
    forma_pgtoController.updateTipoDePagamento
  );

  app.delete(
    "/api/forma_pgto/deletetipoDePagamento:id_forma_pgto",
    forma_pgtoController.deletetipoDePagamento
  );
};
