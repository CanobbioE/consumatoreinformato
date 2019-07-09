insert into users (`id`, `email`, `hash`, `name`, `surname`) values
(100002, 'info@consumatoreinformato.it', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Consumatore', 'Informato', ), -- password: password
(100004, 'y@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Mario', 'Rossi', ), -- password: password
(100005, 'z@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Giovanni', 'Bianchi', ), -- password: password
(100006, 'w@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Fabrizio', 'Verdi', ), -- password: password
(100007, 'q@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Mauro', 'Gialli', ), -- password: password
(100008, 'x@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Mary', 'White', ), -- password: password
(100009, 'e@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Jhon', 'Red', ), -- password: password
(100010, 't@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Federico', 'Amici', ), -- password: password
(100011, 'l@a.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Pierpaolo', 'Pierino', ), -- password: password
(100001, 'b@b.com', '{bcrypt}$2a$10$D/0V22sHAvsIXcimVIJ3T.55nFcrDWXHSSTDRsfSa5JKaCtNyn8zW', 'Fabrizio', 'Fabrizi', ); -- password: password

insert into user_roles (`user_id`, `roles`) values (100002, 'ROLE_ADMIN');
insert into user_roles (`user_id`, `roles`) values (100001, 'ROLE_USER');
insert into user_roles (`user_id`, `roles`) values (100004, 'ROLE_USER');
insert into user_roles (`user_id`, `roles`) values (100005, 'ROLE_USER');
insert into user_roles (`user_id`, `roles`) values (100006, 'ROLE_USER');
insert into user_roles (`user_id`, `roles`) values (100007, 'ROLE_USER');
insert into user_roles (`user_id`, `roles`) values (100008, 'ROLE_USER');
insert into user_roles (`user_id`, `roles`) values (100009, 'ROLE_USER');
insert into user_roles (`user_id`, `roles`) values (100010, 'ROLE_USER');
insert into user_roles (`user_id`, `roles`) values (100011, 'ROLE_USER');

insert into payments (`id`, `payer_id`, `amount`, `date`) values (424242, 100001, 2000, '2019-06-10');
