const FormaPagamento = require("../models/forma_pgto");

module.exports = {
  getTipoDePagamentoPorId(req, res) {
    id_forma_pgto = req.params.id_forma_pgto;

    FormaPagamento.getTipoDePagamentoPorId(id_forma_pgto, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro ao procurar o tipo de pagamento",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },

  setTipoDePagamento(req, res) {
    const forma_pgto = JSON.parse(req.body.forma_pgto);

    FormaPagamento.setTipoDePagamento(forma_pgto, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro da forma de pagamento",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "O registro foi feito corretamente",
        data: data,
      });
    });
  },

  async updateTipoDePagamento(req, res) {
    const forma_pgto = JSON.parse(req.body.forma_pgto);

    FormaPagamento.updateTipoDePagamento(forma_pgto, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Ocorreu um erro com o registro do forma de pagamento",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "A forma de pagamento foi atualizado corretamente",
        data: data,
      });
    });
  },

  async deletetipoDePagamento(req, res) {
    const id_forma_pgto = req.params.id_forma_pgto;

    FormaPagamento.deletetipoDePagamento(
      id_forma_pgto,
      (err, id_forma_pgto) => {
        if (err) {
          return res.status(501).json({
            success: false,
            message: "Ocorreu um erro com a remoção do forma de pagamento",
            error: err,
          });
        }

        return res.status(201).json({
          success: true,
          message: "A forma de pagamento foi removida corretamente",
          data: id_forma_pgto,
        });
      }
    );
  },
};
