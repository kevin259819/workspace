-- =========================
--  CREACIÓN DE LA BASE
-- =========================
CREATE DATABASE IF NOT EXISTS ecommerce
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE ecommerce;

-- =========================
--  TABLA USUARIO
-- =========================
CREATE TABLE Usuario (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  userName     VARCHAR(100) NOT NULL,
  email        VARCHAR(150) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  phoneNumber  VARCHAR(30),
  adress       VARCHAR(255),
  image        VARCHAR(255),
  articles     INT DEFAULT 0
);

-- =========================
--  TABLA CATALOGO
-- =========================
CREATE TABLE Catalogo (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  description   TEXT,
  imgSrc        VARCHAR(255),
  productCount  INT DEFAULT 0
);

-- =========================
--  TABLA CATEGORIA
--  (cada categoría pertenece a un catálogo)
-- =========================
CREATE TABLE Categoria (
  catID       INT AUTO_INCREMENT PRIMARY KEY,
  catName     VARCHAR(100) NOT NULL,
  products    INT DEFAULT 0,
  catalogo_id INT,
  FOREIGN KEY (catalogo_id) REFERENCES Catalogo(id)
);

-- =========================
--  TABLA PRODUCTO
--  (cada producto pertenece a una categoría)
-- =========================
CREATE TABLE Producto (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  description     TEXT,
  cost            DECIMAL(10,2) NOT NULL,
  currency        VARCHAR(10) NOT NULL,
  image           VARCHAR(255),
  soldCount       INT DEFAULT 0,
  comments        TEXT,
  relatedProducts VARCHAR(255),
  categoria_id    INT,
  FOREIGN KEY (categoria_id) REFERENCES Categoria(catID)
);

-- =========================
--  TABLA CARRITO
--  (1:1 con Usuario por la relación "Asignado")
-- =========================
CREATE TABLE Carrito (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNIQUE,              -- 1 usuario ↔ 1 carrito
  subtotal   DECIMAL(10,2) DEFAULT 0,
  iva        DECIMAL(10,2) DEFAULT 0,
  envio      DECIMAL(10,2) DEFAULT 0,
  total      DECIMAL(10,2) DEFAULT 0,
  articles   INT DEFAULT 0,
  FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- =========================
--  TABLA CARRITO_PRODUCTO
--  (N:N entre Carrito y Producto por "Agregado")
--  Guardo también datos del ítem para tener "toda la info"
-- =========================
CREATE TABLE Carrito_Producto (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  carrito_id  INT NOT NULL,
  producto_id INT,
  name        VARCHAR(150) NOT NULL,
  currency    VARCHAR(10) NOT NULL,
  unit_cost   DECIMAL(10,2) NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  image       VARCHAR(255),
  FOREIGN KEY (carrito_id) REFERENCES Carrito(id),
  FOREIGN KEY (producto_id) REFERENCES Producto(id)
);
