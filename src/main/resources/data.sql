-- Rol --
INSERT INTO Rol (id, role)
VALUES (1, 'ADMIN'),
       (2, 'PRESIDENTE'),
       (3, 'VICEPRESIDENTE'),
       (4, 'TESORERO');

INSERT INTO User (id, userName, password, firstName, lastName)
VALUES (1, 'ADMIN', '$2a$10$fcE8R.GN.U3sQK8UOPqU.ukmb5stK788fKWCxcEguOqhdHSqkHQfW', 'ADMIN', 'ADMIN');

INSERT INTO UserRol (userId, rolId)
VALUES (1, 1);