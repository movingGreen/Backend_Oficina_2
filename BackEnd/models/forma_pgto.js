const db = require("../config/config");

const FormaPagamento = {};

FormaPagamento.getTipoDePagamentoPorId = (id_forma_pgto, result) => {
  const sql = `
      select
        *
      from
        forma_pgto AS FP
      WHERE 
        FP.id_forma_pgto = ?
      ;
    `;

  db.query(sql, [id_forma_pgto], (err, formaPagamento) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Forma de pagamento encontrada:", formaPagamento);
      result(null, formaPagamento);
    }
  });
};

FormaPagamento.setTipoDePagamento = (formaPagamento, result) => {
  const sql = `
      INSERT INTO
        forma_pgto(
          tipo_pgto,
        )
      VALUES(?)
      ;
    `;

  db.query(sql, [formaPagamento.tipo_pgto], (err, formaPagamento) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log(
        "Id da nova forma de pagamento:",
        formaPagamento.id_forma_pgto
      );
      result(null, formaPagamento);
    }
  });
};

FormaPagamento.updateTipoDePagamento = (formaPagamento, result) => {
  const sql = `
    update 
      forma_pgto
    set
      tipo_pgto = ?,
    WHERE
      id_forma_pgto = ?
    ;
  `;

  db.query(
    sql,
    [formaPagamento.tipo_pgto, formaPagamento.id_forma_pgto],
    (err, formaPagamento) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Forma de pagamento atualizada:", formaPagamento);
        result(null, formaPagamento);
      }
    }
  );
};

FormaPagamento.deleteTipoDePagamento = (id_forma_pgto, result) => {
  const sql = `
    DELETE
    FROM
      forma_pgto
    WHERE
      id_forma_pgto = ?;
    `;

  db.query(sql, [id_forma_pgto], (err, res) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Forma de pagamento deletada", id_forma_pgto);
      result(null, id_forma_pgto);
    }
  });
};

module.exports = FormaPagamento;
