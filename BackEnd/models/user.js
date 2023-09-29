const db = require("../config/config");
const bcrypt = require("bcryptjs");

const Usuario = {};

Usuario.encontrePorId = (id, result) => {
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
      console.log("Usuario recebido:", usuario);
      result(null, usuario);
    }
  });
};

Usuario.criar = async (usuario, result) => {
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
      usuario.name,
      usuario.lastname,
      usuario.phone,
      usuario.image,
      hash,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Id do novo usuario:", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

Usuario.findDeliveryMen = (result) => {
  const sql = `
    select
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.notification_token
    from 
        usuarios as U
    inner join
        usuario_has_roles as UHR
    on 
        UHR.id_usuario = U.id
    inner join
        roles as R
    on 
        R.id = UHR.id_rol
    where 
        R.id = 2;
    `;

  db.query(sql, (err, data) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      result(null, data);
    }
  });
};

Usuario.findByEmail = (email, result) => {
  const sql = `
        select
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.image,
            U.phone,
            U.password,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route          
                )
            ) AS roles
        from
            usuarios AS U
        INNER JOIN 
            usuario_has_roles AS UHR
        ON
            UHR.id_usuario = U.id
        INNER JOIN
            roles AS R
        ON
            UHR.id_rol = R.id
        WHERE 
            U.email = ?
        GROUP BY
            U.id
    `;

  db.query(sql, [email], (err, usuario) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Usuario recebido:", usuario[0]);
      result(null, usuario[0]);
    }
  });
};

Usuario.update = (usuario, result) => {
  const sql = `
    UPDATE
        usuarios
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        image = ?,
        updated_at = ?
    WHERE
        id = ?;
    `;

  db.query(
    sql,
    [
      usuario.name,
      usuario.lastname,
      usuario.phone,
      usuario.image,
      new Date(),
      usuario.id,
    ],
    (err, res) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Usuario atualizado", usuario.id);
        result(null, usuario.id);
      }
    }
  );
};

Usuario.updateWithoutImage = (usuario, result) => {
  const sql = `
        UPDATE
            usuarios
        SET
            name = ?,
            lastname = ?,
            phone = ?,
            updated_at = ?
        WHERE
            id = ?;
    `;

  db.query(
    sql,
    [usuario.name, usuario.lastname, usuario.phone, new Date(), usuario.id],
    (err, res) => {
      if (err) {
        console.log("Erro:", err);
        result(err, null);
      } else {
        console.log("Usuario atualizado", usuario.id);
        result(null, usuario.id);
      }
    }
  );
};

Usuario.updateNotificationToken = (id, token, result) => {
  const sql = `
        UPDATE
            usuarios
        SET
            notification_token = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

  db.query(sql, [token, new Date(), id], (err, res) => {
    if (err) {
      console.log("Erro:", err);
      result(err, null);
    } else {
      console.log("Usuario atualizado", id);
      result(null, id);
    }
  });
};

module.exports = Usuario;
