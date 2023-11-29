const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const passport = require("passport");

/*
 IMPORTAR ROTAS
*/
const usuarioRotas = require("./routes/usuarioRotas");
const produtoRotas = require("./routes/produtoRotas");
const pedidoRotas = require("./routes/pedidoRotas");
const pedido_produtoRotas = require("./routes/pedido_produtoRotas");
const forma_pgtoRotas = require("./routes/forma_pgtoRotas");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.disable("x-powered-by");

app.set("port", port);

//  CHAMANDO AS ROTAS
usuarioRotas(app);
produtoRotas(app);
pedidoRotas(app);
pedido_produtoRotas(app);
forma_pgtoRotas(app);

server.listen(3000, "192.168.0.4" || "localhost", function () {
  console.log("Aplicacao de NodeJS " + port + " Iniciada...");
});

app.get("/", (req, res) => {
  res.send("Rota raiz do backend");
});

app.get("/teste", (req, res) => {
  res.send("Rota teste");
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});
