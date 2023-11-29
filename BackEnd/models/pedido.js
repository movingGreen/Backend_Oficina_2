const db = require("../config/config");

const Pedido = {};

Pedido.getDadosPedidoPorId = (id_pedido, result) => {
  const sql = `
      select
        *
      from
        pedido AS P
      WHERE 
        P.id_pedido = ?
      ;
    `;

  db.query(sql, [id_pedido], (err, pedido) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Pedido encontrado:", pedido);
      result(null, pedido);
    }
  });
};

Pedido.setPedido = (pedido, result) => {
  const sql = `
      INSERT INTO
        pedido(
          descricao,
          valr_total,
          id_usuario,
          id_forma_pgto
        )
      VALUES(?, ?, ?, ?)
      ;
    `;

  db.query(
    sql,
    [
      pedido.descricao,
      pedido.vlr_total,
      pedido.id_usuario,
      pedido.id_forma_pgto,
    ],
    (err, pedido) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Id do novo pedido:", pedido.id_pedido);
        result(null, pedido);
      }
    }
  );
};

Pedido.updatePedido = (pedido, result) => {
  const sql = `
    update 
      pedido
    set
      descricao = ?,
      vlr_total = ?,
      id_usuario = ?,
      id_forma_pgto = ?,
    WHERE
      id_pedido = ?
    ;
  `;

  db.query(
    sql,
    [
      pedido.descricao,
      pedido.vlr_total,
      pedido.id_usuario,
      pedido.id_forma_pgto,
      pedido.id_pedido,
    ],
    (err, pedido) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Pedido atualizado:", pedido);
        result(null, pedido);
      }
    }
  );
};

Usuario.deletePedidoPorId = (id_pedido, result) => {
  const sql = `
    DELETE
    FROM
      pedido
    WHERE
      id_pedido = ?;
    `;

  db.query(sql, [id_pedido], (err, res) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Pedido deletado", id_pedido);
      result(null, id_pedido);
    }
  });
};

module.exports = Pedido;
