const db = require("../config/config");

const PedidoProduto = {};

PedidoProduto.getPedidoProduto = (id_pedido, id_produto, result) => {
  const sql = `
      select
        *
      from
        pedido_produto AS P
      WHERE 
        P.id_pedido = ?
      AND
        P.id_produto = ?
      ;
    `;

  db.query(sql, [id_pedido, id_produto], (err, pedidoProduto) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Pedido produto encontrado:", pedidoProduto);
      result(null, pedidoProduto);
    }
  });
};

PedidoProduto.setPedidoProduto = (pedidoProduto, result) => {
  const sql = `
      INSERT INTO
        pedido(
          qtd_produto,
          id_pedido,
          id_produto
        )
      VALUES(?, ?, ?)
      ;
    `;

  db.query(
    sql,
    [
      pedidoProduto.qtd_produto,
      pedidoProduto.id_pedido,
      pedidoProduto.id_produto,
    ],
    (err, pedidoProduto) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log(
          `Id do novo pedido produto: id_pedido: ${pedidoProduto.id_pedido} id_produto: ${pedidoProduto.id_produto}`
        );
        result(null, pedidoProduto);
      }
    }
  );
};

PedidoProduto.updatePedidoProduto = (pedidoProduto, result) => {
  const sql = `
    update 
      pedido_produto
    set
      qtd_produto = ?,
    WHERE
      id_pedido = ?
    AND
      id_produto = ?
    ;
  `;

  db.query(
    sql,
    [
      pedidoProduto.qtd_produto,
      pedidoProduto.id_pedido,
      pedidoProduto.id_produto,
    ],
    (err, pedidoProduto) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Pedido produto atualizado:", pedidoProduto);
        result(null, pedidoProduto);
      }
    }
  );
};

PedidoProduto.deletePedidoProduto = (id_pedido, id_produto, result) => {
  const sql = `
    DELETE
    FROM
      pedido_produto
    WHERE
      id_pedido = ?
    AND
      id_produto = ?
      ;
    `;

  db.query(sql, [id_pedido, id_produto], (err, res) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log(
        `Pedido produto deletado id_pedido: ${id_pedido} id_produto: ${id_produto}`
      );
      result(null, [id_pedido, id_produto]);
    }
  });
};

module.exports = PedidoProduto;
