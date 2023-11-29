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

  db.query(sql, [id_forma_pgto], (err, forma_pgto) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Forma de pagamento encontrada:", forma_pgto);
      result(null, forma_pgto);
    }
  });
};

FormaPagamento.setTipoDePagamento = (forma_pgto, result) => {
  const sql = `
      INSERT INTO
        forma_pgto(
          tipo_pgto,
        )
      VALUES(?)
      ;
    `;

  db.query(sql, [forma_pgto.tipo_pgto], (err, forma_pgto) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Id da nova forma de pagamento:", forma_pgto.id_forma_pgto);
      result(null, forma_pgto);
    }
  });
};

FormaPagamento.updateTipoDePagamento = (forma_pgto, result) => {
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
    [forma_pgto.tipo_pgto, forma_pgto.id_forma_pgto],
    (err, forma_pgto) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Forma de pagamento atualizada:", forma_pgto);
        result(null, forma_pgto);
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
