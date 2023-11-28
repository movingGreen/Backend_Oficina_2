const db = require("../config/config");
const bcrypt = require("bcryptjs");

const Produto = {};

Produto.getDadosProdutoPorId = (id, result) => {
  const sql = `
      select
        *
      from
        produto AS P
      WHERE 
        P.id_produto = ?
      ;
    `;

  db.query(sql, [id], (err, produto) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Produto não encontrado:", produto);
      result(null, produto);
    }
  });
};

Produto.setProduto = (produto, result) => {
  const sql = `
      INSERT INTO
        produto(
          nome,
          vlr_produto,
          descricao,
          img
        )
      VALUES(?, ?, ?, ?)
      ;
    `;

  db.query(
    sql,
    [produto.nome, produto.vlr_produto, produto.descricao, produto.img],
    (err, produto) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Id do novo produto:", produto.id_produto);
        result(null, produto);
      }
    }
  );
};

Usuario.updateProduto = (produto, result) => {
  const sql = `
    update 
      produto
    set
      nome = ?,
      vlr_produto = ?,
      descricao = ?,
      img = ?,
    WHERE
      id_produto = ?
    ;
  `;

  db.query(
    sql,
    [
      produto.nome,
      produto.vlr_produto,
      produto.descricao,
      produto.img,
      produto.id_produto,
    ],
    (err, produto) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Produto atualizado:", produto);
        result(null, produto);
      }
    }
  );
};

Usuario.deleteProduto = (id_produto, result) => {
  const sql = `
    DELETE
    FROM
      produto
    WHERE
      id_produto = ?;
    `;

  db.query(sql, [id_produto], (err, res) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Produto deletetado", id_produto);
      result(null, id_produto);
    }
  });
};

module.exports = Produto;
