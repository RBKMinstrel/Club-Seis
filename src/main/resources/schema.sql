DROP TABLE IF EXISTS PedidoDetalle;
DROP TABLE IF EXISTS Pedido;
DROP TABLE IF EXISTS VentaDetalle;
DROP TABLE IF EXISTS Venta;
DROP TABLE IF EXISTS CarritoItem;
DROP TABLE IF EXISTS Carrito;
DROP TABLE IF EXISTS Existencias;
DROP TABLE IF EXISTS Talla;
DROP TABLE IF EXISTS Articulo;
DROP TABLE IF EXISTS Factura;
DROP TABLE IF EXISTS Movimiento;
DROP TABLE IF EXISTS RazonSocial;
DROP TABLE IF EXISTS Cuenta;
DROP TABLE IF EXISTS Categoria;
DROP TABLE IF EXISTS Concepto;
DROP TABLE IF EXISTS UserRol;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Rol;

CREATE TABLE Rol
(
    id   BIGINT      NOT NULL AUTO_INCREMENT,
    role VARCHAR(20) NOT NULL,
    CONSTRAINT RolPK PRIMARY KEY (id),
    CONSTRAINT RoleUniqueKey UNIQUE (role)
) ENGINE = InnoDB;

CREATE TABLE User
(
    id        BIGINT                         NOT NULL AUTO_INCREMENT,
    userName  VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password  VARCHAR(60)                    NOT NULL,
    firstName VARCHAR(60)                    NOT NULL,
    lastName  VARCHAR(60)                    NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE TABLE UserRol
(
    id     BIGINT NOT NULL AUTO_INCREMENT,
    userId BIGINT NOT NULL,
    rolId  BIGINT NOT NULL,
    CONSTRAINT UserRolPK PRIMARY KEY (id),
    CONSTRAINT UserRolUserFK FOREIGN KEY (userId) REFERENCES User (id),
    CONSTRAINT UserRolRolFK FOREIGN KEY (rolId) REFERENCES Rol (id),
    CONSTRAINT UserIdRolIdCombinationUniqueKey UNIQUE (userId, rolId)
) ENGINE = InnoDB;

CREATE TABLE Concepto
(
    id   BIGINT      NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    CONSTRAINT ConceptoPK PRIMARY KEY (id),
    CONSTRAINT ConceptoNameUniqueKey UNIQUE (name)
) ENGINE = InnoDB;

CREATE TABLE Categoria
(
    id   BIGINT      NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    CONSTRAINT CategoriaPK PRIMARY KEY (id),
    CONSTRAINT CategoriaNameUniqueKey UNIQUE (name)
) ENGINE = InnoDB;

CREATE TABLE Cuenta
(
    id   BIGINT      NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    CONSTRAINT CuentaPK PRIMARY KEY (id),
    CONSTRAINT CuentaNameUniqueKey UNIQUE (name)
) ENGINE = InnoDB;

CREATE TABLE RazonSocial
(
    id           BIGINT       NOT NULL AUTO_INCREMENT,
    denominacion VARCHAR(120) NOT NULL,
    cifnif VARCHAR(12) NOT NULL,
    CONSTRAINT RazonSocialPK PRIMARY KEY (id),
    CONSTRAINT RazonSocialCifNifUniqueKey UNIQUE (cifnif)
) ENGINE = InnoDB;

CREATE TABLE Movimiento
(
    id            BIGINT         NOT NULL AUTO_INCREMENT,
    fecha         DATE           NOT NULL,
    esGasto       BOOLEAN        NOT NULL,
    base0         DECIMAL(11, 2) NOT NULL,
    base4         DECIMAL(11, 2) NOT NULL,
    base10        DECIMAL(11, 2) NOT NULL,
    base21        DECIMAL(11, 2) NOT NULL,
    razonSocialId BIGINT,
    conceptoId    BIGINT,
    categoriaId   BIGINT,
    cuentaId      BIGINT,
    CONSTRAINT MovimientoPK PRIMARY KEY (id),
    CONSTRAINT MovimientoRazonSocialFK FOREIGN KEY (razonSocialId) REFERENCES RazonSocial (id) ON DELETE SET NULL,
    CONSTRAINT MovimientoConceptoFK FOREIGN KEY (conceptoId) REFERENCES Concepto (id) ON DELETE SET NULL,
    CONSTRAINT MovimientoCategoriaFK FOREIGN KEY (categoriaId) REFERENCES Categoria (id) ON DELETE SET NULL,
    CONSTRAINT MovimientoCuentaFK FOREIGN KEY (cuentaId) REFERENCES Cuenta (id) ON DELETE SET NULL
) ENGINE = InnoDB;

CREATE TABLE Factura
(
    id           BIGINT       NOT NULL AUTO_INCREMENT,
    filename     VARCHAR(120) NOT NULL,
    filepath     VARCHAR(120) NOT NULL,
    fecha        DATE         NOT NULL,
    movimientoId BIGINT       NOT NULL,
    CONSTRAINT FacturaPK PRIMARY KEY (id),
    CONSTRAINT FacturaMovimientoFK FOREIGN KEY (movimientoId) REFERENCES Movimiento (id)
) ENGINE = InnoDB;

CREATE TABLE Articulo
(
    id          BIGINT         NOT NULL AUTO_INCREMENT,
    name        VARCHAR(120)   NOT NULL,
    imagename   VARCHAR(120),
    imagepath   VARCHAR(120),
    genero      TINYINT        NOT NULL,
    esRopa      BOOLEAN        NOT NULL,
    precio      DECIMAL(11, 2) NOT NULL,
    precioSocio DECIMAL(11, 2) NOT NULL,
    CONSTRAINT ArticuloPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE Talla
(
    id   BIGINT       NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    CONSTRAINT TallaPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE Existencias
(
    id         BIGINT NOT NULL AUTO_INCREMENT,
    cantidad   BIGINT NOT NULL,
    articuloId BIGINT NOT NULL,
    tallaId    BIGINT,
    version    BIGINT,
    CONSTRAINT ExistenciasPK PRIMARY KEY (id),
    CONSTRAINT ExistenciasArticuloFK FOREIGN KEY (articuloId) REFERENCES Articulo (id),
    CONSTRAINT ExistenciasTallaFK FOREIGN KEY (tallaId) REFERENCES Talla (id)
) ENGINE = InnoDB;

CREATE TABLE Carrito
(
    id     BIGINT NOT NULL AUTO_INCREMENT,
    userId BIGINT NOT NULL,
    CONSTRAINT CarritoPK PRIMARY KEY (id),
    CONSTRAINT CarritoUserFK FOREIGN KEY (userId) REFERENCES User (id)

) ENGINE = InnoDB;

CREATE TABLE CarritoItem
(
    id         BIGINT NOT NULL AUTO_INCREMENT,
    quantity   BIGINT NOT NULL,
    carritoId  BIGINT NOT NULL,
    articuloId BIGINT NOT NULL,
    tallaId    BIGINT,
    CONSTRAINT CarritoItemPK PRIMARY KEY (id),
    CONSTRAINT CarritoItemCarritoFK FOREIGN KEY (carritoId) REFERENCES Carrito (id),
    CONSTRAINT CarritoItemArticuloFK FOREIGN KEY (articuloId) REFERENCES Articulo (id),
    CONSTRAINT CarritoItemTallaFK FOREIGN KEY (tallaId) REFERENCES Talla (id)
) ENGINE = InnoDB;

CREATE TABLE Venta
(
    id    BIGINT NOT NULL AUTO_INCREMENT,
    fecha DATE   NOT NULL,
    CONSTRAINT VentaPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE VentaDetalle
(
    id          BIGINT         NOT NULL AUTO_INCREMENT,
    ventaId     BIGINT         NOT NULL,
    cantidad    BIGINT         NOT NULL,
    costeUnidad DECIMAL(11, 2) NOT NULL,
    articuloId  BIGINT         NOT NULL,
    tallaId     BIGINT,
    CONSTRAINT VentaDetallePK PRIMARY KEY (id),
    CONSTRAINT VentaDetalleVentaFK FOREIGN KEY (ventaId) REFERENCES Venta (id) ON DELETE CASCADE,
    CONSTRAINT VentaDetalleArticuloFK FOREIGN KEY (articuloId) REFERENCES Articulo (id),
    CONSTRAINT VentaDetalleTallaFK FOREIGN KEY (tallaId) REFERENCES Talla (id)
) ENGINE = InnoDB;

CREATE TABLE Pedido
(
    id      BIGINT       NOT NULL AUTO_INCREMENT,
    reserva VARCHAR(120) NOT NULL,
    fecha   DATE         NOT NULL,
    CONSTRAINT PedidoPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE PedidoDetalle
(
    id         BIGINT NOT NULL AUTO_INCREMENT,
    pedidoId   BIGINT NOT NULL,
    cantidad   BIGINT NOT NULL,
    articuloId BIGINT NOT NULL,
    tallaId BIGINT,
    CONSTRAINT PedidoDetallePK PRIMARY KEY (id),
    CONSTRAINT PedidoDetallePedidoFK FOREIGN KEY (pedidoId) REFERENCES Pedido (id) ON DELETE CASCADE,
    CONSTRAINT PedidoDetalleArticuloFK FOREIGN KEY (articuloId) REFERENCES Articulo (id),
    CONSTRAINT PedidoDetalleTallaFK FOREIGN KEY (tallaId) REFERENCES Talla (id)
) ENGINE = InnoDB;