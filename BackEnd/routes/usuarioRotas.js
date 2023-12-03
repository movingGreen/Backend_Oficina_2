const usuarioController = require("../controllers/usuarioController");

module.exports = (app) => {
  //GET -> RECEBER DADOS
  //POST -> INSERIR DADOS
  //PUT -> ATUALIZAR DADOS
  //DELETE -> ELIMINAR DADOS

  app.post("/api/usuario/login", usuarioController.login);

  app.get(
    "/api/usuario/getDadosPorId/:id_usuario",
    usuarioController.getDadosPorId
  );

  app.post("/api/usuario/setUsuario", usuarioController.setUsuario);

  app.put("/api/usuario/updateUsuario", usuarioController.updateUsuario);

  app.delete(
    "/api/usuario/deleteUsuarioPorId/:id_usuario",
    usuarioController.deleteUsuarioPorId
  );
};
