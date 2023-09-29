CREATE TABLE usuario (
    id_usuario integer PRIMARY KEY,
    nome varchar(100),
    senha varchar(30),
    cpf char(11),
    email varchar(60),
    telefone varchar(60),
    tipo_usuario char(1),
    endereco varchar(300)
);
CREATE TABLE forma_pgto (
    id_forma_pgto integer PRIMARY KEY,
    tipo_pgto varchar(30)
);
CREATE TABLE pedido (
    id_pedido integer PRIMARY KEY,
    descricao varchar(300),
    vlr_total numeric(10, 2),
    id_usuario integer,
    id_forma_pgto integer,
    FOREIGN KEY(id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY(id_forma_pgto) REFERENCES forma_pgto (id_forma_pgto)
);
CREATE TABLE produto (
    id_produto integer PRIMARY KEY,
    nome varchar(100),
    vlr_produto numeric(10, 2),
    descricao varchar(300),
    img bytea
);
CREATE TABLE pedido_produto (
    qtd_produto integer,
    id_pedido integer,
    id_produto integer,
    PRIMARY KEY(id_pedido, id_produto),
    FOREIGN KEY(id_pedido) REFERENCES pedido (id_pedido),
    FOREIGN KEY(id_produto) REFERENCES produto (id_produto)
);