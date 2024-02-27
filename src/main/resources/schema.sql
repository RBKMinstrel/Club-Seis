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
    cifnif       VARCHAR(11)  NOT NULL,
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
    razonSocialId BIGINT         NOT NULL,
    conceptoId    BIGINT         NOT NULL,
    categoriaId   BIGINT         NOT NULL,
    cuentaId      BIGINT         NOT NULL,
    CONSTRAINT MovimientoPK PRIMARY KEY (id),
    CONSTRAINT MovimientoRazonSocialFK FOREIGN KEY (razonSocialId) REFERENCES RazonSocial (id),
    CONSTRAINT MovimientoConceptoFK FOREIGN KEY (conceptoId) REFERENCES Concepto (id),
    CONSTRAINT MovimientoCategoriaFK FOREIGN KEY (categoriaId) REFERENCES Categoria (id),
    CONSTRAINT MovimientoCuentaFK FOREIGN KEY (cuentaId) REFERENCES Cuenta (id)
) ENGINE = InnoDB;