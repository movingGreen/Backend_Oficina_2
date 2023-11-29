const db = require("../config/config");
const bcrypt = require("bcryptjs");

const Usuario = {};

Usuario.getDadosPorId = (id, result) => {
  const sql = `
        select
            U.id_usuario,
            U.nome,
            U.senha,
            U.cpf,
            U.email,
            U.telefone,
            U.tipo_usuario,
            U.endereco
        from
            usuario AS U
        WHERE 
            U.id_usuario = ?
    `;

  db.query(sql, [id], (err, usuario) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Usuario não encontrado:", usuario);
      result(null, usuario);
    }
  });
};

Usuario.setUsuario = async (usuario, result) => {
  const hash = await bcrypt.hash(usuario.senha, 10);

  const sql = `
        INSERT INTO 
            usuario(
                nome,
                senha,
                cpf,
                email,
                telefone,
                tipo_usuario,
                endereco
            )
        VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      usuario.nome,
      hash,
      usuario.cpf,
      usuario.email,
      usuario.telefone,
      usuario.tipo_usuario,
      usuario.endereco,
    ],
    (err, res) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Id do novo usuario:", res.id_usuario);
        result(null, res.id_usuario);
      }
    }
  );
};

Usuario.login = async (loginUsuario, loginSenha, result) => {
  const loginSenhaHash = await bcrypt.hash(loginSenha, 10);

  const sql = `
    select
      U.nome,
      U.cpf,
      U.email,
      U.telefone,
      U.tipo_usuario,
      U.endereco
    from 
      usuario as U
    where 
      U.nome = ?
    AND
      U.senha = ?
    ;
    `;

  db.query(sql, [loginUsuario, loginSenhaHash], (err, data) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      result(null, data);
    }
  });
};

Usuario.updateUsuario = (usuario, result) => {
  const sql = `
    update 
      usuario
    set
      name = ?,
      cpf = ?,
      email = ?,
      telefone = ?,
      tipo_usuario = ?,
      endereco = ?
    WHERE
      id_usuario = ?
    ;
  `;

  db.query(
    sql,
    [
      usuario.nome,
      usuario.cpf,
      usuario.email,
      usuario.telefone,
      usuario.tipo_usuario,
      usuario.endereco,
      usuario.id_usuario,
    ],
    (err, usuario) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Usuario atualizado:", usuario[0]);
        result(null, usuario[0]);
      }
    }
  );
};

Usuario.deleteUsuarioPorId = (id_usuario, result) => {
  const sql = `
    DELETE
    FROM
      usuario as U
    WHERE
      U.id_usuario = ?;
    `;

  db.query(sql, [id_usuario], (err, res) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Usuario deletado", id_usuario);
      result(null, id_usuario);
    }
  });
};

module.exports = Usuario;
