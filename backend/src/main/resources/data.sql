-- Rol --
INSERT INTO Rol (id, role)
VALUES (1, 'Usuarios'),
       (2, 'Financias'),
       (3, 'Mercancias'),
       (4, 'Configuracion');

INSERT INTO User (id, userName, password, firstName, lastName)
VALUES (1, 'ADMIN', '$2a$10$fcE8R.GN.U3sQK8UOPqU.ukmb5stK788fKWCxcEguOqhdHSqkHQfW', 'ADMIN', 'ADMIN');

INSERT INTO UserRol (userId, rolId)
VALUES (1, 1);
INSERT INTO UserRol (userId, rolId)
VALUES (1, 2);
INSERT INTO UserRol (userId, rolId)
VALUES (1, 3);
INSERT INTO UserRol (userId, rolId)
VALUES (1, 4);

INSERT INTO Talla (id, name)
VALUES (1, 'XS'),
       (2, 'S'),
       (3, 'M'),
       (4, 'L');