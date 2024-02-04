DROP TABLE IF EXISTS UserRol;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Rol;

CREATE TABLE Rol (
    id   BIGINT      NOT NULL AUTO_INCREMENT,
    role VARCHAR(20) NOT NULL,
    CONSTRAINT RolPK PRIMARY KEY (id),
    CONSTRAINT RoleUniqueKey UNIQUE (role)
) ENGINE = InnoDB;

CREATE TABLE User (
    id        BIGINT                         NOT NULL AUTO_INCREMENT,
    userName  VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password  VARCHAR(60)                    NOT NULL,
    firstName VARCHAR(60)                    NOT NULL,
    lastName  VARCHAR(60)                    NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE TABLE UserRol (
    id     BIGINT NOT NULL AUTO_INCREMENT,
    userId BIGINT NOT NULL,
    rolId  BIGINT NOT NULL,
    CONSTRAINT UserRolPK PRIMARY KEY (id),
    CONSTRAINT FK_UserOfUserRol FOREIGN KEY (userId) REFERENCES User (id),
    CONSTRAINT FK_RolOfUserRol FOREIGN KEY (rolId) REFERENCES Rol (id),
    CONSTRAINT UserIdRolIdCombinationUniqueKey UNIQUE (userId, rolId)
) ENGINE = InnoDB;